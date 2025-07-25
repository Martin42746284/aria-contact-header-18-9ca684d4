import ContactForm from "./ContactForm";
import ariaLogo from "@/assets/aria-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-hero text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Contact Form Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prêt à transformer vos défis digitaux ?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Découvrez comment ARIA peut donner vie à votre vision et créer des solutions qui dépassent les attentes.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>

        {/* Footer Content */}
        <div className="border-t border-white/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={ariaLogo} 
                  alt="ARIA Logo" 
                  className="h-12 w-12"
                />
                <h3 className="text-2xl font-bold">ARIA</h3>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Chaque projet est pour nous une aventure unique où créativité et technologie se rencontrent 
                pour donner vie à votre vision. Nos réalisations témoignent de notre capacité à comprendre 
                les enjeux spécifiques de différents secteurs.
              </p>
              <div className="flex space-x-4">
                <span className="text-aria-gold">★</span>
                <span className="text-aria-gold">★</span>
                <span className="text-aria-gold">★</span>
                <span className="text-aria-gold">★</span>
                <span className="text-aria-gold">★</span>
                <span className="ml-2 text-white/80">ÉQUIPE ARIA</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-aria-gold">Nos Services</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Développement Web</li>
                <li>• Design UI/UX</li>
                <li>• Solutions E-commerce</li>
                <li>• Applications Mobile</li>
                <li>• Consulting Digital</li>
                <li>• Maintenance & Support</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-aria-gold">Contact</h4>
              <div className="space-y-3 text-white/80">
                <div>
                  <p className="font-medium">Email</p>
                  <p>contact@aria-digital.com</p>
                </div>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p>+33 (0)1 23 45 67 89</p>
                </div>
                <div>
                  <p className="font-medium">Adresse</p>
                  <p>123 Avenue de l'Innovation<br />75001 Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60">
              © 2024 ARIA - Agence de développement digital. Tous droits réservés.
            </p>
            <p className="text-white/40 mt-2 text-sm">
              Notre approche unique et notre engagement envers l'excellence nous permettent 
              de nous démarquer et de fournir des solutions qui dépassent les attentes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;