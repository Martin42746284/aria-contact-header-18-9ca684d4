// Service pour gérer les projets - migré vers l'API backend

import { projectsApi, type Project } from './api';

// Interface pour la compatibilité avec l'ancien code
export interface AdminProject {
  id: string; // Changé de number à string pour Prisma
  title: string;
  description: string;
  technologies: string[];
  client: string;
  duration: string;
  status: 'EN_COURS' | 'TERMINE' | 'EN_ATTENTE'; // Mise à jour des statuts
  image?: File | null;
  imagePreview?: string | null;
  imageUrl?: string;
  date: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientProject {
  title: string;
  description: string;
  sector: string;
  objectives: string[];
  solutions: string[];
  imageUrl: string;
  websiteUrl?: string;
}

// Fonction pour convertir les statuts de l'API vers l'ancien format
const convertStatusToLegacy = (status: Project['status']): string => {
  switch (status) {
    case 'EN_COURS':
      return 'En cours';
    case 'TERMINE':
      return 'Terminé';
    case 'EN_ATTENTE':
      return 'En attente';
    default:
      return 'En attente';
  }
};

// Fonction pour convertir les statuts vers l'API
const convertStatusToApi = (status: string): Project['status'] => {
  switch (status) {
    case 'En cours':
      return 'EN_COURS';
    case 'Terminé':
      return 'TERMINE';
    case 'En attente':
      return 'EN_ATTENTE';
    default:
      return 'EN_ATTENTE';
  }
};

// Fonction pour convertir un projet API vers AdminProject
const convertApiToAdminProject = (project: Project): AdminProject => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    client: project.client,
    duration: project.duration,
    status: project.status,
    imageUrl: project.imageUrl,
    imagePreview: project.imageUrl,
    date: project.date,
    url: project.url,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
};

// Fonction pour convertir un AdminProject vers le format API
const convertAdminToApiProject = (adminProject: AdminProject): Partial<Project> => {
  return {
    title: adminProject.title,
    description: adminProject.description,
    technologies: adminProject.technologies,
    client: adminProject.client,
    duration: adminProject.duration,
    status: adminProject.status,
    imageUrl: adminProject.imageUrl || adminProject.imagePreview,
    url: adminProject.url,
    date: adminProject.date
  };
};

// Fonction pour convertir un projet admin en projet client
export const convertAdminToClientProject = (adminProject: AdminProject): ClientProject => {
  // Générer des objectifs basés sur les données admin
  const generateObjectives = (project: AdminProject): string[] => {
    const objectives = [];
    
    if (project.client) {
      objectives.push(`Répondre aux besoins spécifiques de ${project.client}`);
    }
    
    objectives.push("Créer une solution digitale innovante et performante");
    
    if (project.technologies.length > 0) {
      objectives.push(`Implémenter les technologies ${project.technologies.slice(0, 2).join(' et ')} pour une solution moderne`);
    }
    
    if (project.status === 'TERMINE') {
      objectives.push("Livrer un projet fini dans les délais impartis");
    }
    
    return objectives;
  };

  // Générer des solutions basées sur les données admin
  const generateSolutions = (project: AdminProject): string[] => {
    const solutions = [];
    
    solutions.push("Développement sur mesure avec les meilleures pratiques");
    
    if (project.technologies.includes('React') || project.technologies.includes('Vue') || project.technologies.includes('Angular')) {
      solutions.push("Interface utilisateur moderne et responsive");
    }
    
    if (project.technologies.includes('Node.js') || project.technologies.includes('Express') || project.technologies.includes('API')) {
      solutions.push("Backend robuste avec API sécurisée");
    }
    
    if (project.technologies.includes('MongoDB') || project.technologies.includes('PostgreSQL') || project.technologies.includes('MySQL')) {
      solutions.push("Base de données optimisée pour les performances");
    }
    
    solutions.push("Tests approfondis et déploiement sécurisé");
    
    if (project.status === 'TERMINE') {
      solutions.push("Support et maintenance post-lancement");
    }
    
    return solutions;
  };

  // Déterminer le secteur basé sur le nom du client ou le titre
  const determineSector = (project: AdminProject): string => {
    const title = project.title.toLowerCase();
    const client = project.client.toLowerCase();
    
    if (title.includes('e-commerce') || title.includes('boutique') || title.includes('shop')) {
      return 'E-commerce / Retail';
    }
    if (title.includes('bank') || title.includes('finance') || title.includes('payment')) {
      return 'Finance / Banque';
    }
    if (title.includes('health') || title.includes('medical') || title.includes('santé')) {
      return 'Santé / Medical';
    }
    if (title.includes('education') || title.includes('learning') || title.includes('école')) {
      return 'Education / Formation';
    }
    if (title.includes('travel') || title.includes('transport') || title.includes('voyage')) {
      return 'Transport / Voyage';
    }
    if (title.includes('tech') || title.includes('software') || title.includes('app')) {
      return 'Tech / Software';
    }
    
    return 'Digital / Innovation';
  };

  return {
    title: adminProject.title,
    description: adminProject.description,
    sector: determineSector(adminProject),
    objectives: generateObjectives(adminProject),
    solutions: generateSolutions(adminProject),
    imageUrl: adminProject.imageUrl || adminProject.imagePreview || '/placeholder.svg',
    websiteUrl: adminProject.url
  };
};

// API Functions - Utilisation de l'API backend

// Récupérer tous les projets admin
export const getAllAdminProjects = async (): Promise<AdminProject[]> => {
  try {
    const response = await projectsApi.getAllProjects();
    if (response.success && response.data) {
      return response.data.projects.map(convertApiToAdminProject);
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets admin:', error);
    // Fallback vers les projets par défaut si l'API est indisponible
    console.log('Utilisation des projets par défaut (API indisponible)');
    return getDefaultAdminProjects();
  }
};

// Récupérer les projets par défaut en format AdminProject
const getDefaultAdminProjects = (): AdminProject[] => {
  return [
    {
      id: "1",
      title: "CGEPRO",
      description: "Votre spécialiste du bois exotique et des aménagements extérieurs sur La Réunion",
      technologies: ["WordPress", "PHP", "MySQL", "SEO"],
      client: "CGEPRO",
      duration: "2 mois",
      status: "Terminé",
      image: null,
      imagePreview: "/src/assets/go.jpg",
      date: "15/03/2024",
      url: "https://cgepro.com"
    },
    {
      id: "2",
      title: "ERIC RABY",
      description: "Coaching en compétences sociales et émotionnelles",
      technologies: ["React", "Node.js", "Stripe", "Calendar API"],
      client: "Eric Raby Coaching",
      duration: "3 mois",
      status: "Terminé",
      image: null,
      imagePreview: "/src/assets/eric.jpg",
      date: "22/04/2024",
      url: "https://eric-raby.com"
    },
    {
      id: "3",
      title: "CONNECT TALENT",
      description: "Plateforme de mise en relation entre entreprises et talents africains",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Socket.io"],
      client: "Connect Talent Inc",
      duration: "5 mois",
      status: "Terminé",
      image: null,
      imagePreview: "/src/assets/connect.png",
      date: "10/05/2024",
      url: "https://connecttalent.cc"
    },
    {
      id: "4",
      title: "SOA DIA TRAVEL",
      description: "Transport & Logistique à Madagascar",
      technologies: ["Angular", "Express.js", "MongoDB", "Maps API"],
      client: "SOA DIA TRAVEL",
      duration: "4 mois",
      status: "Terminé",
      image: null,
      imagePreview: "/src/assets/soa.jpg",
      date: "28/06/2024",
      url: "https://soatransplus.mg"
    }
  ];
};

// Récupérer les projets depuis l'API (publics seulement)
export const getProjectsFromStorage = async (): Promise<AdminProject[]> => {
  try {
    const response = await projectsApi.getPublicProjects();
    if (response.success && response.data) {
      return response.data.projects.map(convertApiToAdminProject);
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return [];
  }
};

// Récupérer les projets formatés pour la page client
export const getClientProjects = async (): Promise<ClientProject[]> => {
  try {
    const adminProjects = await getAllAdminProjects();
    // Filtrer seulement les projets terminés pour la page client
    const publishedProjects = adminProjects.filter(project => project.status === 'TERMINE');
    return publishedProjects.map(convertAdminToClientProject);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets clients:', error);
    console.log('Utilisation des projets par défaut (API indisponible)');
    return getDefaultProjects(); // Fallback vers les projets par défaut
  }
};

// Sauvegarder les projets (maintenant via API)
export const saveProjectsToStorage = async (projects: AdminProject[]): Promise<void> => {
  // Cette fonction n'est plus nécessaire avec l'API backend
  // Garde pour compatibilité
  console.log('saveProjectsToStorage: Cette fonction est obsolète avec l\'API backend');
};

// Sauvegarder la liste complète des projets admin (via API)
export const saveAllAdminProjects = async (projects: AdminProject[]): Promise<void> => {
  // Cette fonction n'est plus nécessaire avec l'API backend
  // Garde pour compatibilité
  console.log('saveAllAdminProjects: Cette fonction est obsolète avec l\'API backend');
};

// Projets par défaut (fallback en cas d'erreur API)
export const getDefaultProjects = (): ClientProject[] => {
  return [
    {
      title: "CGEPRO",
      description: "Votre spécialiste du bois exotique et des aménagements extérieurs sur La Réunion",
      sector: "BTP / Équipements professionnels",
      objectives: [
        "Présenter l'expertise de CGEPRO dans le domaine des équipements techniques",
        "Renforcer la crédibilité de la marque auprès des partenaires industriels",
        "Proposer un catalogue clair des produits"
      ],
      solutions: [
        "Site vitrine professionnel avec une identité sobre et élégante",
        "Fiches produits accessibles et consultables facilement",
        "Design responsive et contenu optimisé SEO",
        "Back-office simple pour mise à jour autonome du client"
      ],
      imageUrl: "/images/go.jpg",
      websiteUrl: "https://cgepro.com"
    },
    {
      title: "ERIC RABY",
      description: "Coaching en compétences sociales et émotionnelles",
      sector: "Coaching / Formation",
      objectives: [
        "Présenter clairement l'expertise du coach",
        "Renforcer la visibilité en ligne du coach",
        "Faciliter la prise de contact et la réservation de séances",
        "Proposer du contenu à valeur ajoutée",
        "Créer un lien de confiance avec les clients potentiels"
      ],
      solutions: [
        "Site vitrine moderne et responsive",
        "Développement d'un parcours utilisateur optimisé",
        "Intégration d'outils de réservation ou de prise de rendez-vous en ligne",
        "Proposition des différentes expertises et des expériences professionnelles",
        "Mise en place d'un blog intégré",
        "SEO et hébergement optimaux"
      ],
      imageUrl: "/images/eric.jpg",
      websiteUrl: "https://eric-raby.com"
    },
    {
      title: "CONNECT TALENT",
      description: "Plateforme de mise en relation entre entreprises et talents africains",
      sector: "Recrutement & Talents internationaux",
      objectives: [
        "Créer une plateforme de mise en relation entre entreprises et talents africains",
        "Valoriser la dimension humaine et l'impact social du projet",
        "Faciliter l'enregistrement et la candidature en ligne"
      ],
      solutions: [
        "UI/UX épuré pour une navigation intuitive",
        "Formulaires interactifs pour les candidats et recruteurs",
        "Intégration d'un espace sécurisé pour les profils",
        "Site multilingue prêt à l'internationalisation"
      ],
      imageUrl: "/images/connect.png",
      websiteUrl: "https://connecttalent.cc"
    },
    {
      title: "SOA DIA TRAVEL",
      description: "Transport & Logistique à Madagascar",
      sector: "Transport & Logistique",
      objectives: [
        "Mettre en avant la flotte de transport et les services logistiques",
        "Créer une plateforme responsive et professionnelle",
        "Intégrer une navigation simple et une identité visuelle forte"
      ],
      solutions: [
        "Design moderne centré sur la fiabilité",
        "Structure claire et hiérarchisée pour les services",
        "Intégration d'un formulaire de demande de devis",
        "Site rapide et optimisé mobile"
      ],
      imageUrl: "/images/soa.jpg",
      websiteUrl: "https://soatransplus.mg"
    }
  ];
};

// Nouvelles fonctions pour l'API

// Créer un nouveau projet
export const createProject = async (project: Omit<AdminProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProject | null> => {
  try {
    const apiProject = convertAdminToApiProject(project);
    const response = await projectsApi.createProject(apiProject as any);
    if (response.success && response.data) {
      return convertApiToAdminProject(response.data.project);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    throw error;
  }
};

// Mettre à jour un projet
export const updateProject = async (id: string, project: Partial<AdminProject>): Promise<AdminProject | null> => {
  try {
    const apiProject = convertAdminToApiProject(project as AdminProject);
    const response = await projectsApi.updateProject(id, apiProject);
    if (response.success && response.data) {
      return convertApiToAdminProject(response.data.project);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    throw error;
  }
};

// Supprimer un projet
export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const response = await projectsApi.deleteProject(id);
    return response.success;
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    throw error;
  }
};

// Changer le statut d'un projet
export const updateProjectStatus = async (id: string, status: AdminProject['status']): Promise<AdminProject | null> => {
  try {
    const response = await projectsApi.updateStatus(id, status);
    if (response.success && response.data) {
      return convertApiToAdminProject(response.data.project);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    throw error;
  }
};
