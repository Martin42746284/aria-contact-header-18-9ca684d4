import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Award, Code, Palette, Rocket, Shield } from 'lucide-react';

// Importez vos images ou utilisez des placeholders
const missionImage = "/images/mission.jpg";
const visionImage = "/images/vision.jpg";
const valuesImage = "/images/values.jpg";
const process1 = "/images/process-1.jpg";
const process2 = "/images/process-2.jpg";
const process3 = "/images/process-3.jpg";
const process4 = "/images/process-4.jpg";

const AboutSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Detect visible elements
      const elements = document.querySelectorAll('.scroll-animate');
      const newVisible = new Set();
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible) {
          newVisible.add(index);
        }
      });
      
      setVisibleElements(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-rotateIn {
          animation: rotateIn 0.8s ease-out forwards;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-0 { animation-delay: 0s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes rotateIn {
          from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
          to { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .parallax-slow {
          transform: translateY(${scrollY * 0.1}px);
        }
        
        .parallax-fast {
          transform: translateY(${scrollY * 0.2}px);
        }
        
        .gradient-border {
          background: linear-gradient(45deg, #f97316, #ea580c);
          padding: 2px;
          border-radius: 12px;
        }
        
        .gradient-border-inner {
          background: #1f2937;
          border-radius: 10px;
          height: 100%;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.9));
          z-index: 1;
        }
        
        .process-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #f97316;
        }
      `}</style>

      {/* Section À propos */}
      <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl parallax-slow"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-400 rounded-full blur-3xl parallax-fast"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-600 rounded-full blur-2xl parallax-slow"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header avec image hero */}
            <div className="text-center mb-20">
              <div className={`scroll-animate ${visibleElements.has(0) ? 'visible' : ''} mb-8`}>
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                      <Rocket className="w-16 h-16 text-orange-500 floating" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className={`scroll-animate ${visibleElements.has(1) ? 'visible' : ''} text-5xl font-bold text-orange-500 mb-6`}>
                À PROPOS D'ARIA
              </h2>
              <p className={`scroll-animate ${visibleElements.has(2) ? 'visible' : ''} text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed`}>
                Plus qu'une agence digitale, nous sommes vos partenaires de transformation numérique
              </p>
            </div>

            {/* Mission, Vision, Valeurs avec images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {/* Mission avec image de fond */}
              <div className={`scroll-animate ${visibleElements.has(3) ? 'visible' : ''} bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-500 group relative overflow-hidden min-h-[350px]`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${missionImage})` }}
                >
                  <div className="image-overlay"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Notre Mission</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    Accompagner nos clients dans leur transformation numérique en créant des solutions 
                    innovantes, performantes et sur mesure qui génèrent un impact réel sur leur croissance.
                  </p>
                </div>
              </div>

              {/* Vision avec image de fond */}
              <div className={`scroll-animate ${visibleElements.has(4) ? 'visible' : ''} bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-500 group relative overflow-hidden min-h-[350px]`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${visionImage})` }}
                >
                  <div className="image-overlay"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Notre Vision</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    Être le partenaire privilégié des entreprises ambitieuses qui souhaitent exploiter pleinement 
                    le potentiel du digital pour créer des expériences numériques exceptionnelles.
                  </p>
                </div>
              </div>

              {/* Valeurs avec image de fond */}
              <div className={`scroll-animate ${visibleElements.has(5) ? 'visible' : ''} bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-500 group relative overflow-hidden min-h-[350px]`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${valuesImage})` }}
                >
                  <div className="image-overlay"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Nos Valeurs</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    L'excellence technique, la créativité sans limites, et l'écoute attentive de nos clients 
                    sont au cœur de tout ce que nous faisons. Transparence, innovation et collaboration.
                  </p>
                </div>
              </div>
            </div>

            {/* Section principale avec contenu et statistiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Statistiques avec animations */}
              <div className={`scroll-animate ${visibleElements.has(6) ? 'visible' : ''} space-y-8`}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="gradient-border group cursor-pointer">
                    <div className="gradient-border-inner p-6 text-center group-hover:bg-gray-800 transition-all duration-300">
                      <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                      <p className="text-gray-300 text-sm">Projets réalisés</p>
                    </div>
                  </div>
                  <div className="gradient-border group cursor-pointer">
                    <div className="gradient-border-inner p-6 text-center group-hover:bg-gray-800 transition-all duration-300">
                      <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                      <p className="text-gray-300 text-sm">Années d'expérience</p>
                    </div>
                  </div>
                  <div className="gradient-border group cursor-pointer">
                    <div className="gradient-border-inner p-6 text-center group-hover:bg-gray-800 transition-all duration-300">
                      <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                      <p className="text-gray-300 text-sm">Clients satisfaits</p>
                    </div>
                  </div>
                  <div className="gradient-border group cursor-pointer">
                    <div className="gradient-border-inner p-6 text-center group-hover:bg-gray-800 transition-all duration-300">
                      <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                      <p className="text-gray-300 text-sm">Support client</p>
                    </div>
                  </div>
                </div>

                {/* Services avec icônes */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-orange-500 mb-6 flex items-center">
                    <Code className="w-8 h-8 mr-3" />
                    Nos Expertises
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300">Développement</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300">Design UI/UX</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300">Marketing Digital</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notre équipe avec image conceptuelle */}
              <div className={`scroll-animate ${visibleElements.has(7) ? 'visible' : ''} space-y-8`}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-500">Notre Équipe</h3>
                    </div>
                    
                    {/* Représentation visuelle de l'équipe */}
                    <div className="flex justify-center mb-6">
                      <div className="flex -space-x-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`w-12 h-12 bg-gradient-to-r from-orange-${400 + i * 100} to-orange-${500 + i * 100} rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-sm">{i}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Notre équipe multidisciplinaire réunit des experts passionnés : développeurs full-stack, 
                      designers UI/UX, chefs de projet agiles et consultants en stratégie digitale.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Ensemble, nous formons une équipe soudée et créative, déterminée à repousser les limites 
                      du possible pour offrir à nos clients des solutions digitales d'exception.
                    </p>
                  </div>
                </div>

                {/* Call-to-action avec animation */}
                <div className="text-center">
                  <div className="relative inline-block group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <Button className="relative bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg transition-all duration-300 group-hover:scale-105">
                      Parlons de votre projet
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section processus avec timeline */}
            <div className={`scroll-animate ${visibleElements.has(8) ? 'visible' : ''} bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-12 rounded-2xl border border-gray-700`}>
              <h3 className="text-3xl font-bold text-orange-500 text-center mb-12">Notre Processus</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { image: process1, title: "Écoute", desc: "Analyse de vos besoins" },
                  { image: process2, title: "Création", desc: "Design & développement" },
                  { image: process3, title: "Lancement", desc: "Mise en production" },
                  { image: process4, title: "Support", desc: "Maintenance & évolution" }
                ].map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="process-image w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;