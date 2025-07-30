import React from 'react';

// Mock ContactForm component
const ContactForm = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nom</label>
          <input 
            type="text" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="votre@email.com"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea 
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Décrivez votre projet..."
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Envoyer le message
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white text-black">
      <div className="container mx-auto px-6 py-16">
        {/* Contact Form Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-orange-500">
              Prêt à transformer vos défis digitaux ?
            </h2>
            <p className="text-black/80 text-lg max-w-2xl mx-auto">
              Découvrez comment ARIA peut donner vie à votre vision et créer des solutions qui dépassent les attentes.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;