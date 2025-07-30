import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <>
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
                src="/images/aria-logo.png" 
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
    </>
  );
};

export default HeroSection;