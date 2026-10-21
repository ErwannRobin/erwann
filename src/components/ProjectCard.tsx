import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ArrowUpRight } from "lucide-react";
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
  /** When set, activating the card opens its full view instead of expanding inline. */
  onOpen?: (opener: HTMLElement) => void;
}

export const ProjectCard = ({ project, index, fullView = false, onOpen }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailId = useId();
  return (
    <article
      id={fullView ? undefined : projectAnchor(project.title)}
      className={`art-project group ${fullView ? "art-project-full" : ""}`}
      data-expanded={isExpanded}
      tabIndex={fullView ? undefined : 0}
      aria-label={fullView ? undefined : onOpen ? `Open ${project.title}` : project.title}
      aria-haspopup={onOpen ? "dialog" : undefined}
      onClick={event => {
        if (fullView || !(event.target instanceof Element) || event.target.closest("a, button")) return;
        if (window.getSelection()?.toString()) return;
        if (onOpen) onOpen(event.currentTarget);
        else setIsExpanded(value => !value);
      }}
      onKeyDown={event => {
        if (fullView || event.target !== event.currentTarget || !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        if (onOpen) onOpen(event.currentTarget);
        else setIsExpanded(value => !value);
      }}
    >
      <div className="art-project-image">
        <img
          src={project.image}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
           className="art-project-artwork h-full w-full object-cover"
        />
      </div>
      <div className="art-project-caption">
        <div className="art-project-meta flex items-center gap-2 text-xs opacity-80 mb-2">
          <span>{project.date}</span><span aria-hidden="true">/</span><span>{project.categories[0]}</span>
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-lg md:text-xl font-semibold leading-tight">{project.title}</h3>
          <div className="flex shrink-0 gap-1">
            {!fullView && !onOpen && <Button variant="ghost" size="icon" onClick={() => setIsExpanded(value => !value)} aria-expanded={isExpanded} aria-controls={detailId} aria-label={`${isExpanded ? "Collapse" : "Expand"} ${project.title}`} title={isExpanded ? "Collapse details" : "Expand details"} className="art-project-control">
              <ChevronUp className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </Button>}
            <Button variant="ghost" size="icon" asChild className="art-project-control">
              <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} title={`Visit ${project.title}`}><ArrowUpRight /></a>
            </Button>
          </div>
        </div>
        <div className="art-project-subtitle"><div>
          <p className={`mt-2 text-sm leading-relaxed opacity-90 ${isExpanded || fullView ? "" : "line-clamp-2"}`}>{project.description}</p>
        </div></div>
        <div id={detailId} hidden={!isExpanded && !fullView} className="art-project-details">
          <p className="mt-4 text-sm leading-relaxed opacity-90">{project.longDescription}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-xs opacity-70">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </article>
  );
};
