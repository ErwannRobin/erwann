import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

import type { Category } from "./CategoryFilter";
import { ProjectSignature, projectAnchor } from "./ProjectSignature";

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  url: string;
  image: string;
  tags: string[];
  categories: Exclude<Category, "All">[];
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--my", `${py * 100}%`);
    setTilt({ x: (0.5 - py) * 14, y: (px - 0.5) * 14 });
  };

  return (
    <Card 
      id={projectAnchor(project.title)}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt(null)}
      className="editorial-project card-spotlight relative group overflow-hidden rounded-xl transition-[transform,box-shadow,border-color] duration-300 ease-out animate-slide-up backdrop-blur-md border-primary/30 hover:border-primary/60"
      style={{ 
        animationDelay: `${(index % 3) * 100}ms`,
        transform: tilt ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)` : undefined,
      }}
    >
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground md:hidden">
        <span className="flex items-center gap-2"><span className="text-primary">{String(index + 1).padStart(2, "0")}</span><span className="h-px w-5 bg-border" />{project.categories[0]}</span>
        <span>{project.date}</span>
      </div>
      {/* Image */}
      <div className="editorial-artwork relative overflow-hidden aspect-video bg-background/40">
        <ProjectSignature title={project.title} />
        <img
          src={project.image}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <Button variant="secondary" size="icon" asChild className="absolute right-3 bottom-3 h-11 w-11 rounded-full border border-foreground/20 bg-background/60 text-foreground backdrop-blur-xl md:hidden">
          <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight className="h-5 w-5" /></a>
        </Button>
      </div>

      <CardHeader className="editorial-card-header">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:inline-flex h-8 w-8 hover:text-primary transition-colors"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={`project-detail-${index}`}
              aria-label={isExpanded ? "Show less" : "Read more"}
              className="editorial-arrow-toggle inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
        <CardDescription className="text-sm">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="editorial-card-content">
        {/* Tags */}
        <div className="editorial-tags flex flex-wrap gap-2 mb-4">
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
          <div id={`project-detail-${index}`}
            aria-hidden={!isExpanded}
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
            aria-expanded={isExpanded}
            aria-controls={`project-detail-${index}`}
            className={`editorial-read-more w-full transition-colors ${
              isExpanded 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' 
                : 'text-primary hover:text-primary-foreground hover:bg-primary/20'
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
