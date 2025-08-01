// Service pour gérer les projets partagés entre le dashboard admin et la page client

export interface AdminProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  client: string;
  duration: string;
  status: 'En cours' | 'Terminé' | 'En attente';
  image: File | null;
  imagePreview: string | null;
  date: string;
  url?: string;
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
    
    if (project.status === 'Terminé') {
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
    
    if (project.status === 'Terminé') {
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
    imageUrl: adminProject.imagePreview || '/placeholder.svg', // Fallback vers placeholder
    websiteUrl: adminProject.url
  };
};

// Clés localStorage pour les projets
const PROJECTS_STORAGE_KEY = 'aria_admin_projects'; // Projets publiés (pour compatibilité)
const ADMIN_PROJECTS_STORAGE_KEY = 'aria_all_admin_projects'; // Tous les projets admin

// Sauvegarder les projets dans localStorage
export const saveProjectsToStorage = (projects: AdminProject[]): void => {
  try {
    // Filtrer les projets terminés pour les afficher sur la page client
    const publishedProjects = projects.filter(project => project.status === 'Terminé');
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(publishedProjects));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des projets:', error);
  }
};

// Récupérer les projets depuis localStorage
export const getProjectsFromStorage = (): AdminProject[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return [];
  }
};

// Récupérer les projets formatés pour la page client
export const getClientProjects = (): ClientProject[] => {
  const adminProjects = getProjectsFromStorage();
  return adminProjects.map(convertAdminToClientProject);
};

// Projets admin par défaut (basés sur les projets originaux)
export const getDefaultAdminProjects = (): AdminProject[] => {
  return [
    {
      id: 1,
      title: "CGEPRO",
      description: "Votre spécialiste du bois exotique et des aménagements extérieurs sur La Réunion",
      technologies: ["WordPress", "PHP", "MySQL", "SEO"],
      client: "CGEPRO",
      duration: "2 mois",
      status: "Terminé",
      image: null,
      imagePreview: "/placeholder.svg",
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
      image: null,
      imagePreview: "/placeholder.svg",
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
      image: null,
      imagePreview: "/placeholder.svg",
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
      image: null,
      imagePreview: "/placeholder.svg",
      date: "28/06/2024",
      url: "https://soatransplus.mg"
    },
    {
      id: 5,
      title: "Site E-commerce Fashion",
      description: "Développement d'une plateforme e-commerce complète avec système de paiement intégré",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      client: "Fashion Boutique",
      duration: "3 mois",
      status: "Terminé",
      image: null,
      imagePreview: null,
      date: "15/06/2024",
      url: "https://fashion-boutique.com"
    },
    {
      id: 6,
      title: "Application Mobile Banking",
      description: "Application mobile sécurisée pour la gestion bancaire avec authentification biométrique",
      technologies: ["React Native", "Firebase", "Redux"],
      client: "BankTech Solutions",
      duration: "6 mois",
      status: "En cours",
      image: null,
      imagePreview: null,
      date: "01/07/2024"
    }
  ];
};

// Projets par défaut (fallback)
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
      imageUrl: "/placeholder.svg",
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
      imageUrl: "/placeholder.svg",
      websiteUrl: "https://eric-raby.com"
    }
  ];
};
