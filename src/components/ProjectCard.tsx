import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  url: string;
  image: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className="group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)] animate-slide-up bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--glass-shadow)] relative hover:shadow-[0_0_80px_hsl(262_83%_58%_/_0.8),0_0_40px_hsl(280_70%_65%_/_0.6),0_0_20px_hsl(320_70%_60%_/_0.4)]"
      style={{ 
        animationDelay: `${index * 100}ms`,
        backgroundImage: 'linear-gradient(135deg, hsl(262 83% 58% / 0.4) 0%, hsl(280 70% 65% / 0.4) 50%, hsl(320 70% 60% / 0.4) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        border: '3px solid transparent'
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted/30 backdrop-blur-sm">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 shrink-0 hover:text-primary transition-colors"
          >
            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <CardDescription className="text-sm">{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable section */}
        <div className="space-y-3">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full transition-colors ${
              isExpanded 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'text-primary hover:text-primary/80'
            }`}
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
