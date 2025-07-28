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
    <div className="min-h-screen bg-aria-cream">
      <Header />
      
      {/* Hero Section */}
      <section id="accueil" className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={ariaLogo} 
                alt="ARIA Logo" 
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Transformons vos défis digitaux en opportunités de croissance
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Chaque projet est pour nous une aventure unique où créativité et technologie se rencontrent 
              pour donner vie à votre vision. Découvrez nos réalisations qui témoignent de notre capacité 
              à concevoir des solutions digitales qui dépassent les attentes.
            </p>
            <Button variant="sunset" size="lg" className="text-lg px-8 py-4">
              Découvrir nos réalisations
            </Button>
          </div>
        </div>
      </section>
         {/* À Propos */}
      <section id="apropos" className="py-20 bg-aria-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-aria-teal mb-6">
                À PROPOS D'ARIA
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Découvrez l'histoire, la vision et les valeurs qui nous animent dans notre mission 
                de transformer le paysage digital de nos clients.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-aria-teal">
                  Notre Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chez ARIA, nous croyons que chaque entreprise mérite une présence digitale qui reflète 
                  son authenticité et ses ambitions. Notre mission est de transformer vos défis digitaux 
                  en opportunités de croissance durables, en alliant créativité, innovation technologique 
                  et compréhension approfondie de vos enjeux métier.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nous nous engageons à créer des solutions digitales qui non seulement répondent à vos 
                  besoins actuels, mais anticipent également les évolutions futures de votre secteur d'activité.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                  <img 
                    src={ariaLogo} 
                    alt="ARIA Innovation" 
                    className="h-20 w-20"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-aria-teal mb-4">
                    Innovation & Excellence
                  </h4>
                  <p className="text-muted-foreground">
                    Depuis notre création, nous avons accompagné des dizaines d'entreprises 
                    dans leur transformation digitale, avec un taux de satisfaction client de 98%.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">🎯</span>
                </div>
                <h4 className="text-lg font-bold text-aria-teal mb-3">
                  Expertise Technique
                </h4>
                <p className="text-muted-foreground text-sm">
                  Une maîtrise complète des technologies web modernes et des meilleures pratiques du développement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">💡</span>
                </div>
                <h4 className="text-lg font-bold text-aria-teal mb-3">
                  Créativité & Design
                </h4>
                <p className="text-muted-foreground text-sm">
                  Des créations visuelles impactantes qui capturent l'essence de votre marque et engagent vos utilisateurs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">🤝</span>
                </div>
                <h4 className="text-lg font-bold text-aria-teal mb-3">
                  Accompagnement
                </h4>
                <p className="text-muted-foreground text-sm">
                  Un suivi personnalisé et un accompagnement stratégique pour maximiser votre retour sur investissement.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-aria-teal mb-6 text-center">
                Nos Valeurs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-aria-teal rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-aria-teal mb-1">Transparence</h4>
                      <p className="text-muted-foreground text-sm">
                        Communication claire et honnête à chaque étape du projet.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-aria-teal rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-aria-teal mb-1">Excellence</h4>
                      <p className="text-muted-foreground text-sm">
                        Recherche constante de la perfection dans chaque détail.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-aria-teal rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-aria-teal mb-1">Innovation</h4>
                      <p className="text-muted-foreground text-sm">
                        Adoption des dernières technologies et tendances du marché.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-aria-teal rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-aria-teal mb-1">Partenariat</h4>
                      <p className="text-muted-foreground text-sm">
                        Construction de relations durables basées sur la confiance mutuelle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Réalisations */}
      <section id="realisations" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-aria-teal mb-6">
              NOS RÉALISATIONS
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Laissez-vous inspirer par ces histoires de transformation digitale réussie. 
              Chaque projet reflète notre engagement à comprendre les enjeux spécifiques 
              de chaque secteur et à concevoir des solutions sur mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Notre Approche */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-aria-teal mb-6">
              Pourquoi ces projets nous différencient ?
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-aria-cream p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-aria-teal mb-3">
                    1. Approche sur mesure pour chaque secteur
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chaque industrie a ses propres particularités et exigences. Notre approche sur mesure nous permet 
                    d'adapter nos solutions aux besoins spécifiques de chaque secteur, garantissant ainsi une pertinence 
                    et une efficacité maximales.
                  </p>
                </div>

                <div className="bg-aria-cream p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-aria-teal mb-3">
                    2. Qualité visuelle et technique alignée sur les standards actuels
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous sommes déterminés à fournir des produits qui non seulement sont esthétiquement plaisants mais 
                    aussi techniquement robustes, offrant ainsi une expérience utilisateur exceptionnelle.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-aria-cream p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-aria-teal mb-3">
                    3. Sites performants, rapides et centrés utilisateur
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La performance et la rapidité sont essentielles pour offrir une expérience fluide et agréable. 
                    Nos sites sont conçus pour être rapides et réactifs, créons des interfaces intuitives et accessibles.
                  </p>
                </div>

                <div className="bg-aria-cream p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-aria-teal mb-3">
                    4. Processus collaboratif et accompagnement stratégique
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous croyons en l'importance du travail d'équipe et de la collaboration avec nos clients. 
                    En offrant un accompagnement stratégique, nous aidons nos clients à maximiser leur retour sur investissement.
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