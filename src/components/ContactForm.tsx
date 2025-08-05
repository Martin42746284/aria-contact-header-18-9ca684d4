import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { contactApi, type ContactMessage } from "@/services/api";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await contactApi.sendMessage(formData);

      if (response.success) {
        toast({
          title: "Message envoyé !",
          description: response.message || "Nous vous recontacterons dans les plus brefs délais.",
        });

        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(response.message || "Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
      
      if (error instanceof Error) {
        if (error.message.includes('Backend non disponible')) {
          errorMessage = "Service temporairement indisponible. Veuillez réessayer plus tard ou nous contacter directement.";
        } else if (error.message.includes('Trop de messages')) {
          errorMessage = "Vous avez envoyé trop de messages récemment. Veuillez attendre avant de réessayer.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erreur lors de l'envoi",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testEmailConfig = async () => {
    try {
      const response = await contactApi.testEmailConfig();
      if (response.success) {
        toast({
          title: "Configuration email",
          description: "✅ Configuration email validée",
        });
      }
    } catch (error) {
      toast({
        title: "Configuration email",
        description: "❌ Problème de configuration email",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white shadow-card border-aria-cream">
      <CardHeader>
        <CardTitle className="text-aria-teal text-center">
          Contactez-nous pour votre projet
        </CardTitle>
        <div className="text-center">
          <button
            type="button"
            onClick={testEmailConfig}
            className="text-xs text-gray-500 hover:text-aria-sunset transition-colors"
          >
            🔍 Tester la configuration email
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-aria-teal">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="Votre nom et prénom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-aria-teal">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-aria-teal">Entreprise</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="Nom de votre entreprise (optionnel)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-aria-teal">Sujet *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="Objet de votre demande"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-aria-teal">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="border-aria-cream focus:ring-aria-sunset"
              placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
            />
          </div>

          <Button
            type="submit"
            variant="sunset"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Envoi en cours...</span>
              </div>
            ) : (
              "Envoyer le message"
            )}
          </Button>
          
          <div className="text-xs text-gray-500 text-center mt-2">
            💌 Nous vous répondrons dans les 24-48h
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
