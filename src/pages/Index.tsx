import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import ariaLogo from "@/assets/aria-logo.png";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Styles d'animation globaux */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <Header />
      
      {/* Section Hero avec image de fond */}
      <section 
        id="accueil" 
        className="relative py-32 text-white"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/cover.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8 animate-float">
              <img 
                src="src/assets/aria-logo.png" 
                alt="ARIA Logo" 
                className="h-40 w-34"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
              Transformons vos défis digitaux en opportunités de croissance
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed animate-fadeIn delay-100">
              Chaque projet est pour nous une aventure unique où créativité et technologie se rencontrent 
              pour donner vie à votre vision. Découvrez nos réalisations qui témoignent de notre capacité 
              à concevoir des solutions digitales qui dépassent les attentes.
            </p>
            <Button 
              className="text-lg px-8 py-4 bg-orange-600 hover:bg-orange-700 transition-all duration-300 animate-fadeIn delay-200"
            >
              Découvrir nos réalisations
            </Button>
          </div>
        </div>
      </section>

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
                  className="hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Approche */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orange-500 mb-6 animate-fadeIn">
              Pourquoi ces projets nous différencient ?
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 animate-fadeIn delay-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <span className="text-orange-500 text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-500">
                      Approche sur mesure
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Chaque industrie a ses particularités. Nous adaptons nos solutions aux besoins spécifiques de chaque secteur.
                  </p>
                </div>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 animate-fadeIn delay-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <span className="text-orange-500 text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-500">
                      Qualité visuelle et technique
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Produits esthétiquement plaisants et techniquement robustes pour une expérience exceptionnelle.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 animate-fadeIn delay-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <span className="text-orange-500 text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-500">
                      Performance optimale
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Sites rapides et réactifs avec des interfaces intuitives et accessibles.
                  </p>
                </div>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 animate-fadeIn delay-400">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <span className="text-orange-500 text-xl font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-500">
                      Collaboration étroite
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Nous travaillons en étroite collaboration avec nos clients pour maximiser leur ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;