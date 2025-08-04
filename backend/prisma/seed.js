import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer l'utilisateur admin
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@aria-creative.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@aria-creative.com',
      password: adminPassword,
      name: 'Administrateur',
      role: 'admin'
    }
  });

  console.log('👤 Admin user created:', admin.email);

  // Créer les projets par défaut
  const projects = [
    {
      title: "CGEPRO",
      description: "Votre spécialiste du bois exotique et des aménagements extérieurs sur La Réunion",
      technologies: ["WordPress", "PHP", "MySQL", "SEO"],
      client: "CGEPRO",
      duration: "2 mois",
      status: "TERMINE",
      imageUrl: "/uploads/projects/cgepro.jpg",
      date: "15/03/2024",
      url: "https://cgepro.com"
    },
    {
      title: "ERIC RABY",
      description: "Coaching en compétences sociales et émotionnelles",
      technologies: ["React", "Node.js", "Stripe", "Calendar API"],
      client: "Eric Raby Coaching",
      duration: "3 mois",
      status: "TERMINE",
      imageUrl: "/uploads/projects/eric.jpg",
      date: "22/04/2024",
      url: "https://eric-raby.com"
    },
    {
      title: "CONNECT TALENT",
      description: "Plateforme de mise en relation entre entreprises et talents africains",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Socket.io"],
      client: "Connect Talent Inc",
      duration: "5 mois",
      status: "TERMINE",
      imageUrl: "/uploads/projects/connect.png",
      date: "10/05/2024",
      url: "https://connecttalent.cc"
    },
    {
      title: "SOA DIA TRAVEL",
      description: "Transport & Logistique à Madagascar",
      technologies: ["Angular", "Express.js", "MongoDB", "Maps API"],
      client: "SOA DIA TRAVEL",
      duration: "4 mois",
      status: "TERMINE",
      imageUrl: "/uploads/projects/soa.jpg",
      date: "28/06/2024",
      url: "https://soatransplus.mg"
    },
    {
      title: "Site E-commerce Fashion",
      description: "Développement d'une plateforme e-commerce complète avec système de paiement intégré",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      client: "Fashion Boutique",
      duration: "3 mois",
      status: "TERMINE",
      imageUrl: null,
      date: "15/06/2024",
      url: "https://fashion-boutique.com"
    },
    {
      title: "Application Mobile Banking",
      description: "Application mobile sécurisée pour la gestion bancaire avec authentification biométrique",
      technologies: ["React Native", "Firebase", "Redux"],
      client: "BankTech Solutions",
      duration: "6 mois",
      status: "EN_COURS",
      imageUrl: null,
      date: "01/07/2024",
      url: null
    }
  ];

  // Vérifier d'abord si des projets existent déjà
  const existingProjects = await prisma.project.count();

  if (existingProjects === 0) {
    for (const projectData of projects) {
      const project = await prisma.project.create({
        data: projectData
      });
      console.log(`📄 Projet créé: ${project.title}`);
    }
  } else {
    console.log('📄 Projets déjà existants, pas de création');
  }

  console.log('✅ Seeding terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
