import { Button } from "@/components/ui/button";
import ariaLogo from "@/assets/aria-logo.png";

const Header = () => {
  return (
    <header className="bg-gradient-hero shadow-elegant sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={ariaLogo} 
              alt="ARIA Logo" 
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold text-white">ARIA</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-white/90 hover:text-white transition-colors">
              Accueil
            </a>
            <a href="#realisations" className="text-white/90 hover:text-white transition-colors">
              Nos Réalisations
            </a>
            <a href="#services" className="text-white/90 hover:text-white transition-colors">
              Services
            </a>
            <a href="#apropos" className="text-white/90 hover:text-white transition-colors">
              À Propos
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <Button variant="sunset" size="lg">
            Devis Gratuit
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;