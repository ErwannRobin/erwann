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
      className="group overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 animate-slide-up border-border/50 bg-card/50 backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
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
            className="w-full text-primary hover:text-primary/80 transition-colors"
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
