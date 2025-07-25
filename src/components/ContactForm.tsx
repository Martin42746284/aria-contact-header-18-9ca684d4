import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
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
                className="border-aria-cream focus:ring-aria-sunset"
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

          <Button type="submit" variant="sunset" size="lg" className="w-full">
            Envoyer le message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;