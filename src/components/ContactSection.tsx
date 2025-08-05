import React from 'react';
import { Mail, Phone, MapPin, Clock, Sparkles } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import ContactForm from "@/components/ContactForm";
import "@/styles/animations.css";

const ContactSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { containerRef, visibleItems } = useStaggeredAnimation(4, 200);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "aria.madacom@gmail.com",
      description: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+262 693 52 16 26",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: MapPin,
      title: "Localisation",
      content: "Antananarivo, Madagascar",
      description: "Sur rendez-vous"
    },
    {
      icon: Clock,
      title: "Disponibilité",
      content: "24/7 Support",
      description: "Assistance continue"
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400 rounded-full filter blur-3xl animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header section */}
        <div
          ref={elementRef}
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-orange-400 mr-3 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Transformons vos idées en réalité
            </h2>
            <Sparkles className="w-8 h-8 text-orange-400 ml-3 animate-float delay-500" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chaque grand projet commence par une conversation. Partagez votre vision avec nous
            et découvrons ensemble comment créer des solutions digitales exceptionnelles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Informations de contact */}
          <div
            ref={containerRef}
            className="lg:col-span-1 space-y-6"
          >
            <div className={`transform transition-all duration-500 ${
              visibleItems.has(0) ? 'animate-fade-in-left' : 'opacity-0 translate-x-4'
            }`}>
              <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3" />
                Contactez-nous
              </h3>
            </div>

            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover-lift cursor-pointer transform ${
                    visibleItems.has(index + 1) ? 'animate-fade-in-left' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-orange-400 font-medium mb-1">{info.content}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* CTA section */}
        <div className={`text-center mt-16 transform transition-all duration-700 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-xl p-8 rounded-2xl border border-orange-500/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Prêt pour le décollage ?
            </h3>
            <p className="text-gray-300 mb-6">
              Rejoignez les entreprises qui ont déjà fait confiance à ARIA pour transformer leur présence digitale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                ✓ Consultation gratuite
              </span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                ✓ Devis personnalisé
              </span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                ✓ Support 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
