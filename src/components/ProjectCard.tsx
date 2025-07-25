import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  sector: string;
  objectives: string[];
  solutions: string[];
  imageUrl: string;
  websiteUrl?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  sector, 
  objectives, 
  solutions, 
  imageUrl, 
  websiteUrl 
}: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 bg-white border-aria-cream">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`Projet ${title}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aria-teal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-aria-teal">{title}</h3>
          <Badge variant="secondary" className="bg-aria-cream text-aria-teal">
            {sector}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-aria-teal mb-2">Objectifs :</h4>
            <ul className="text-sm space-y-1">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-aria-sunset mt-1">•</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-aria-teal mb-2">Solutions :</h4>
            <ul className="text-sm space-y-1">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-aria-gold mt-1">✓</span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {websiteUrl && (
          <div className="mt-6">
            <a 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aria-sunset hover:text-aria-gold transition-colors font-medium"
            >
              Visiter le site →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;