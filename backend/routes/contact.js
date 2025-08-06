import express from 'express';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';
import { authenticateToken } from './admin.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Rate limiting spécifique pour le contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact requests per hour
  message: { error: 'Trop de messages envoyés. Réessayez dans une heure.' }
});

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  company: Joi.string().max(100).allow('', null).optional(),
  subject: Joi.string().min(2).max(200).required(),
  message: Joi.string().min(10).max(1000).required()
});

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST /api/contact - Envoyer un message de contact
router.post('/', contactLimiter, async (req, res) => {
  try {
    // Validation des données
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details[0].message
      });
    }

    const { name, email, company, subject, message } = value;

    // Sauvegarder le message en base de données
    let savedMessage = null;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: {
          name,
          email,
          company: company || null,
          subject,
          message,
          status: 'NOUVEAU'
        }
      });
      console.log('💾 Message sauvegardé en base avec ID:', savedMessage.id);
    } catch (dbError) {
      console.error('Erreur sauvegarde DB:', dbError);
      // Continue même si la DB échoue
    }

    // Configuration de l'email
    const transporter = createTransporter();

    // Email à l'admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'contact@aria-creative.com',
      subject: `[ARIA CREATIVE] Nouveau message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nouveau message de contact</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Entreprise:</strong> ${company || 'Non spécifiée'}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #64748b; font-size: 14px;">
            Message reçu le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `
    };

    // Email de confirmation au client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de réception - Aria Creative',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Merci pour votre message !</h2>
          
          <p>Bonjour ${name},</p>
          
          <p>Nous avons bien reçu votre message concernant "<strong>${subject}</strong>" et nous vous en remercions.</p>
          
          <p>Notre équipe va examiner votre demande et vous recontactera dans les plus brefs délais, généralement sous 24-48h.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Récapitulatif de votre message:</h3>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Entreprise:</strong> ${company || 'Non spécifiée'}</p>
            <p style="margin-top: 15px;"><strong>Votre message:</strong></p>
            <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
          </div>
          
          <p>En attendant, n'hésitez pas à consulter nos réalisations sur notre site web.</p>
          
          <p>À bientôt !<br>
          <strong>L'équipe Aria Creative</strong></p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px;">
            Si vous n'êtes pas à l'origine de ce message, vous pouvez ignorer cet email.
          </p>
        </div>
      `
    };

    // Envoi des emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    // Log pour le monitoring
    console.log(`📧 Contact message sent from: ${email} - Subject: ${subject}`);

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès ! Nous vous recontacterons bientôt.',
      data: savedMessage ? { id: savedMessage.id } : null
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    
    res.status(500).json({
      error: 'Erreur lors de l\'envoi du message',
      message: 'Veuillez réessayer plus tard ou nous contacter directement.'
    });
  }
});

// GET /api/contact/test - Test de configuration email
router.get('/test', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();

    res.json({
      success: true,
      message: 'Configuration email OK'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur de configuration email',
      error: error.message
    });
  }
});

// === ROUTES ADMIN POUR LA GESTION DES MESSAGES ===

// GET /api/contact/admin - Récupérer tous les messages (admin seulement)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: { messages: messages }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des messages'
    });
  }
});

// GET /api/contact/admin/:id - Récupérer un message spécifique (admin seulement)
router.get('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message non trouvé'
      });
    }

    res.json({
      success: true,
      data: { message: message }
    });
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du message'
    });
  }
});

// PUT /api/contact/admin/:id/status - Changer le statut d'un message (admin seulement)
router.put('/admin/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['NOUVEAU', 'LU', 'TRAITE', 'ARCHIVE'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Statut invalide'
      });
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: {
        id: req.params.id
      },
      data: {
        status: status
      }
    });

    console.log(`📊 Message status updated: ${updatedMessage.id} -> ${status} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: { message: updatedMessage }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Message non trouvé'
      });
    }
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour du statut'
    });
  }
});

// DELETE /api/contact/admin/:id - Supprimer un message (admin seulement)
router.delete('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const deletedMessage = await prisma.contactMessage.delete({
      where: {
        id: req.params.id
      }
    });

    console.log(`🗑️ Contact message deleted: ${deletedMessage.id} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Message supprimé avec succès'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Message non trouvé'
      });
    }
    console.error('Error deleting contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression du message'
    });
  }
});

// GET /api/contact/admin/stats - Statistiques des messages (admin seulement)
router.get('/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalMessages = await prisma.contactMessage.count();
    const newMessages = await prisma.contactMessage.count({
      where: { status: 'NOUVEAU' }
    });
    const processedMessages = await prisma.contactMessage.count({
      where: { status: 'TRAITE' }
    });

    res.json({
      success: true,
      data: {
        stats: {
          total: totalMessages,
          nouveau: newMessages,
          traite: processedMessages,
          archive: await prisma.contactMessage.count({ where: { status: 'ARCHIVE' } })
        }
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

export default router;
