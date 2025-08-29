import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useTypewriter, useParallax } from "@/hooks/useScrollAnimation";
import { ChevronDown, Sparkles, Zap, Rocket } from 'lucide-react';
import "@/styles/animations.css";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { offset } = useParallax(0.3);

  const dynamicWords = [
    "défis digitaux",
    "idées innovantes",
    "projets ambitieux",
    "visions créatives"
  ];

  const { displayText, isComplete } = useTypewriter(
    "Transformons vos " + dynamicWords[currentWordIndex] + " en opportunités de croissance",
    30,
    true
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 4000);
    return () => clearInterval(interval);
  },);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      {/* Styles avancés */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(15, 15, 15, 0.8) 25%,
            rgba(30, 30, 30, 0.7) 50%,
            rgba(15, 15, 15, 0.8) 75%,
            rgba(0, 0, 0, 0.9) 100%
          );
        }
          @keyframes typewriter {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blinkCaret {
  0%, 100% { border-color: transparent }
  50% { border-color: orange }
}

@keyframes typewriter {
  from { width: 0 }
  to { width: 100% }
}

@keyframes textColorShift {
  0%   { color: #ffffff; }
  50%  { color: #f97316; }
  100% { color: #ffffff; }
}

.typewriter-text {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.05em;
  width: fit-content;
  display: inline-block;
  animation: 
    typewriter 4s steps(60, end),
    textColorShift 2s ease-in-out infinite;
}




        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1));
          animation: floatingElement 6s ease-in-out infinite;
        }

        @keyframes floatingElement {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }

        .interactive-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #ea580c);
          transition: all 0.3s ease;
        }

        .interactive-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .interactive-button:hover::before {
          left: 100%;
        }

        .scroll-indicator {
          animation: bounceScroll 2s ease-in-out infinite;
        }

        @keyframes bounceScroll {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .logo-container {
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-container:hover {
          transform: scale(1.05) rotate(2deg);
        }

        .logo-container::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #ea580c);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .logo-container:hover::after {
          opacity: 0.3;
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Section Hero avec fond interactif */}
      <section
        ref={sectionRef}
        id="accueil"
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/images/cover.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${offset * 0.5}px)`
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
    </>
  );
};

export default HeroSection;
