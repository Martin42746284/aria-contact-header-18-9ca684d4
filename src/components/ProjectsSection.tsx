import React from 'react';
import ProjectCard from "@/components/ProjectCard";
import cgeproMockup from "@/assets/go.jpg";
import ericRabyMockup from "@/assets/eric.jpg";
import connectTalentMockup from "@/assets/connect.png";
import soaDiaTravelMockup from "@/assets/soa.jpg";

const projects = [
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
    imageUrl: cgeproMockup,
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
    imageUrl: ericRabyMockup,
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
    imageUrl: connectTalentMockup,
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
    imageUrl: soaDiaTravelMockup,
    websiteUrl: "https://soatransplus.mg"
  }
];

const ProjectsSection = () => {
  return (
    <>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Section Réalisations */}
      <section id="realisations" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orange-500 mb-6 animate-fadeIn">
              NOS RÉALISATIONS
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-100">
              Laissez-vous inspirer par ces histoires de transformation digitale réussie. 
              Chaque projet reflète notre engagement à comprendre les enjeux spécifiques 
              de chaque secteur et à concevoir des solutions sur mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <ProjectCard 
                  {...project}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;