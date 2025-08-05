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
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        title: "Erreur lors de l'envoi",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
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

  return (
    <Card className="bg-white shadow-card border-aria-cream">
      <CardHeader>
        <CardTitle className="text-aria-teal text-center">
          Contactez-nous pour votre projet
        </CardTitle>
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
                minLength={2}
                maxLength={100}
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="Votre nom complet"
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
                maxLength={100}
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
                minLength={5}
                maxLength={200}
                className="border-aria-cream focus:ring-aria-sunset"
                placeholder="Sujet de votre demande"
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
              minLength={10}
              maxLength={1000}
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
            {isLoading ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
