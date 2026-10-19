import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import type { Category } from "./CategoryFilter";
import { projectAnchor } from "./ProjectSignature";

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
  fullView?: boolean;
}

export const ProjectCard = ({ project, index, fullView = false }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailId = useId();
  return (
    <article id={fullView ? undefined : projectAnchor(project.title)} className={`art-project group ${fullView ? "art-project-full" : ""}`}>
      <div className="art-project-image">
        <img
          src={project.image}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="art-project-caption">
        <div className="flex items-center gap-2 text-xs opacity-80 mb-2">
          <span>{project.date}</span><span aria-hidden="true">/</span><span>{project.categories[0]}</span>
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-lg md:text-xl font-semibold leading-tight">{project.title}</h3>
          <div className="flex shrink-0 gap-1">
            {!fullView && <Button variant="ghost" size="icon" onClick={() => setIsExpanded(value => !value)} aria-expanded={isExpanded} aria-controls={detailId} aria-label={`${isExpanded ? "Collapse" : "Expand"} ${project.title}`} title={isExpanded ? "Collapse details" : "Expand details"} className="art-project-control">
              <ChevronDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </Button>}
            <Button variant="ghost" size="icon" asChild className="art-project-control">
              <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} title={`Visit ${project.title}`}><ArrowUpRight /></a>
            </Button>
          </div>
        </div>
        <p className={`mt-2 text-sm leading-relaxed opacity-90 ${isExpanded || fullView ? "" : "line-clamp-2"}`}>{project.description}</p>
        <div id={detailId} hidden={!isExpanded && !fullView} className="art-project-details">
          <p className="mt-4 text-sm leading-relaxed opacity-90">{project.longDescription}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-xs opacity-70">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </article>
  );
};
