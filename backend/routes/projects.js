import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import Joi from 'joi';
import { authenticateToken } from './admin.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier de stockage des projets
const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');
const DATA_DIR = path.join(__dirname, '../data');

// Validation schema pour les projets
const projectSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  client: Joi.string().min(2).max(100).required(),
  duration: Joi.string().min(2).max(50).required(),
  status: Joi.string().valid('En cours', 'Terminé', 'En attente').required(),
  url: Joi.string().uri().allow('').optional(),
  imageUrl: Joi.string().allow('').optional()
});

// Utilitaires pour la gestion des fichiers
const ensureDataDirectory = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

const readProjects = async () => {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Fichier n'existe pas, retourner projets par défaut
      return getDefaultProjects();
    }
    throw error;
  }
};

const writeProjects = async (projects) => {
  await ensureDataDirectory();
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
};

const getDefaultProjects = () => {
  return [
    {
      id: 1,
      title: "CGEPRO",
      description: "Votre spécialiste du bois exotique et des aménagements extérieurs sur La Réunion",
      technologies: ["WordPress", "PHP", "MySQL", "SEO"],
      client: "CGEPRO",
      duration: "2 mois",
      status: "Terminé",
      imageUrl: "/uploads/projects/cgepro.jpg",
      date: "15/03/2024",
      url: "https://cgepro.com"
    },
    {
      id: 2,
      title: "ERIC RABY",
      description: "Coaching en compétences sociales et émotionnelles",
      technologies: ["React", "Node.js", "Stripe", "Calendar API"],
      client: "Eric Raby Coaching",
      duration: "3 mois",
      status: "Terminé",
      imageUrl: "/uploads/projects/eric.jpg",
      date: "22/04/2024",
      url: "https://eric-raby.com"
    },
    {
      id: 3,
      title: "CONNECT TALENT",
      description: "Plateforme de mise en relation entre entreprises et talents africains",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Socket.io"],
      client: "Connect Talent Inc",
      duration: "5 mois",
      status: "Terminé",
      imageUrl: "/uploads/projects/connect.png",
      date: "10/05/2024",
      url: "https://connecttalent.cc"
    },
    {
      id: 4,
      title: "SOA DIA TRAVEL",
      description: "Transport & Logistique à Madagascar",
      technologies: ["Angular", "Express.js", "MongoDB", "Maps API"],
      client: "SOA DIA TRAVEL",
      duration: "4 mois",
      status: "Terminé",
      imageUrl: "/uploads/projects/soa.jpg",
      date: "28/06/2024",
      url: "https://soatransplus.mg"
    }
  ];
};

// GET /api/projects - Récupérer tous les projets (publics)
router.get('/', async (req, res) => {
  try {
    const projects = await readProjects();
    
    // Filtrer seulement les projets terminés pour l'affichage public
    const publishedProjects = projects.filter(project => project.status === 'Terminé');
    
    res.json({
      success: true,
      projects: publishedProjects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
  }
});

// GET /api/projects/admin - Récupérer tous les projets (admin seulement)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const projects = await readProjects();
    
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
    const projects = await readProjects();
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
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

    const projects = await readProjects();
    
    // Générer un nouvel ID
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const newProject = {
      id: newId,
      ...value,
      date: new Date().toLocaleDateString('fr-FR'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    await writeProjects(projects);
    
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

    const projects = await readProjects();
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    
    const updatedProject = {
      ...projects[projectIndex],
      ...value,
      updatedAt: new Date().toISOString()
    };
    
    projects[projectIndex] = updatedProject;
    await writeProjects(projects);
    
    console.log(`📝 Project updated: ${updatedProject.title} by ${req.user.email}`);
    
    res.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      project: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du projet' });
  }
});

// DELETE /api/projects/:id - Supprimer un projet (admin seulement)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await readProjects();
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    
    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);
    await writeProjects(projects);
    
    console.log(`🗑️ Project deleted: ${deletedProject.title} by ${req.user.email}`);
    
    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
  }
});

// POST /api/projects/:id/status - Changer le statut d'un projet (admin seulement)
router.post('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['En cours', 'Terminé', 'En attente'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    
    const projects = await readProjects();
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    
    projects[projectIndex].status = status;
    projects[projectIndex].updatedAt = new Date().toISOString();
    
    await writeProjects(projects);
    
    console.log(`📊 Project status updated: ${projects[projectIndex].title} -> ${status} by ${req.user.email}`);
    
    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      project: projects[projectIndex]
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
});

export default router;
