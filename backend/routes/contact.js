import express from 'express';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';

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
  company: Joi.string().max(100).allow(''),
  subject: Joi.string().min(5).max(200).required(),
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
      message: 'Message envoyé avec succès ! Nous vous recontacterons bientôt.'
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

export default router;
