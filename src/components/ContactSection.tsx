import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            Prêt à transformer votre présence digitale ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button className="text-lg px-8 py-4 bg-orange-600 hover:bg-orange-700 transition-all duration-300">
            Prendre contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;