import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / scrollHeight) * 100;
      setScrollProgress(progress);

      const sections = ['accueil', 'realisations', 'services', 'apropos', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style >{`
        @keyframes logoSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 53, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.6), 0 0 30px rgba(255, 107, 53, 0.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-logo-spin { animation: logoSpin 0.8s ease-out; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }

        .nav-link {
          position: relative;
          overflow: hidden;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35, #ff8c42);
          transition: width 0.3s ease;
        }
        .nav-link:hover::before,
        .nav-link.active::before {
          width: 100%;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
          transition: left 0.5s ease;
        }
        .nav-link:hover::after {
          left: 100%;
        }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }
        .mobile-menu.open {
          max-height: 300px;
        }
      `}</style>

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-orange-500/30 shadow-lg shadow-orange-500/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo avec taille dynamique */}
            <div className="flex items-center space-x-3 group cursor-pointer animate-float">
              <div className={`relative transition-all duration-500 ease-in-out ${scrolled ? 'h-14 w-14' : 'h-14 w-14'}`}>
                <img
                  src="src/assets/aria-logo.png"
                  alt="ARIA Logo"
                  className="w-full h-full object-contain group-hover:animate-logo-spin group-hover:border-orange-400"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { href: '#accueil', label: 'Accueil' },
                { href: '#about', label: 'À Propos' },
                { href: '#realisations', label: 'Nos Réalisations' },
                { href: '#services', label: 'Services' },
                { href: '#contact', label: 'Contact' }
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    activeSection === item.href.substring(1)
                      ? 'text-orange-400 active'
                      : scrolled 
                        ? 'text-gray-300 hover:text-orange-400' 
                        : 'text-white/90 hover:text-orange-400'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 animate-glow"
              >
                <span className="flex items-center space-x-2">
                  <span>Devis Gratuit</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className={`relative w-8 h-8 flex flex-col justify-center items-center transition-all duration-300 ${
                  scrolled ? 'text-orange-400' : 'text-white'
                }`}
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('open');
                  }
                }}
              >
                <span className="block w-6 h-0.5 bg-current transition-all duration-300 transform"></span>
                <span className="block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 transform"></span>
                <span className="block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 transform"></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="mobile-menu md:hidden mt-4">
            <nav className="flex flex-col space-y-4 p-4 bg-black/95 backdrop-blur-md rounded-lg border border-orange-500/30">
              {[
                { href: '#accueil', label: 'Accueil' },
                { href: '#about', label: 'Nos Réalisations' },
                { href: '#services', label: 'Services' },
                { href: '#apropos', label: 'À Propos' },
                { href: '#contact', label: 'Contact' }
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link block px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-orange-400 bg-orange-500/10 active'
                      : 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 border-t border-orange-500/30">
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25"
                >
                  contact
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Barre de progression scroll */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </header>
    </>
  );
};

export default Header;
