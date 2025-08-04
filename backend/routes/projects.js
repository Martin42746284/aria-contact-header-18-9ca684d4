import express from 'express';
import Joi from 'joi';
import { authenticateToken } from './admin.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Validation schema pour les projets
const projectSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  client: Joi.string().min(2).max(100).required(),
  duration: Joi.string().min(2).max(50).required(),
  status: Joi.string().valid('EN_COURS', 'TERMINE', 'EN_ATTENTE').required(),
  url: Joi.string().uri().allow('').optional(),
  imageUrl: Joi.string().allow('').optional(),
  date: Joi.string().optional()
});

// GET /api/projects - Récupérer tous les projets (publics)
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'TERMINE'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
  }
});

// GET /api/projects/admin - Récupérer tous les projets (admin seulement)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      projects: projects
    });
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
  }
});

// GET /api/projects/:id - Récupérer un projet spécifique
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    res.json({
      success: true,
      project: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du projet' });
  }
});

// POST /api/projects - Créer un nouveau projet (admin seulement)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Validation des données
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details[0].message
      });
    }

    const projectData = {
      ...value,
      date: value.date || new Date().toLocaleDateString('fr-FR')
    };

    const newProject = await prisma.project.create({
      data: projectData
    });

    console.log(`📝 New project created: ${newProject.title} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      project: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Erreur lors de la création du projet' });
  }
});

// PUT /api/projects/:id - Mettre à jour un projet (admin seulement)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Validation des données
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details[0].message
      });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: req.params.id
      },
      data: value
    });

    console.log(`📝 Project updated: ${updatedProject.title} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      project: updatedProject
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du projet' });
  }
});

// DELETE /api/projects/:id - Supprimer un projet (admin seulement)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: req.params.id
      }
    });

    console.log(`🗑️ Project deleted: ${deletedProject.title} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
  }
});

// POST /api/projects/:id/status - Changer le statut d'un projet (admin seulement)
router.post('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['EN_COURS', 'TERMINE', 'EN_ATTENTE'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: req.params.id
      },
      data: {
        status: status
      }
    });

    console.log(`📊 Project status updated: ${updatedProject.title} -> ${status} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      project: updatedProject
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    console.error('Error updating project status:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
});

export default router;
