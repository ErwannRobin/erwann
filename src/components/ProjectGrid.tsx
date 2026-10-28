import { useState, type KeyboardEvent, type MutableRefObject } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProjectCard, type Project } from "./ProjectCard";
import { projectIcons } from "./projectIcons";

function ProjectIcon({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return <img src={!failed && projectIcons[project.title] ? projectIcons[project.title] : project.image} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className="project-tile-icon" />;
}

/** Arrow keys move focus between tiles by screen position, whatever the column count. */
function moveFocus(event: KeyboardEvent<HTMLElement>) {
  const delta = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
  const current = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>(".project-tile") : null;
  if (!delta || !current) return;
  const tiles = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(".project-tile"));
  const from = current.getBoundingClientRect();
  let best: HTMLElement | null = null;
  let bestScore = Infinity;
  for (const tile of tiles) {
    if (tile === current) continue;
    const rect = tile.getBoundingClientRect();
    const dx = rect.left - from.left;
    const dy = rect.top - from.top;
    const along = delta[0] ? dx * delta[0] : dy * delta[1];
    const across = Math.abs(delta[0] ? dy : dx);
    // Same row/column first; otherwise the nearest tile further along that direction.
    if (along <= 1 || (delta[0] && across > from.height / 2)) continue;
    const score = across * 4 + along;
    if (score < bestScore) { best = tile; bestScore = score; }
  }
  if (!best) return;
  event.preventDefault();
  best.focus();
}

export function ProjectGrid({ projects, onOpen }: { projects: Project[]; onOpen: (project: Project, opener: HTMLElement) => void }) {
  return <>
    <div className="project-icon-grid max-w-7xl mx-auto" onKeyDown={moveFocus}>
      {projects.map(project => <Button key={project.title} variant="ghost" className="project-tile" onClick={event => onOpen(project, event.currentTarget)} aria-label={`Open ${project.title}`} aria-haspopup="dialog">
        <ProjectIcon project={project} />
        <span className="project-tile-name">{project.title}</span>
      </Button>)}
    </div>
  </>;
}

/**
 * Full project view with the 3D twirl; returns focus to whatever opened it.
 * `siblings` is the displayed order: left/up steps back through it, right/down forward, Enter visits the app.
 */
export function ProjectDialog({ project, siblings, onSelect, onClose, opener }: { project: Project | null; siblings: Project[]; onSelect: (project: Project) => void; onClose: () => void; opener: MutableRefObject<HTMLElement | null> }) {
  const step = (event: KeyboardEvent<HTMLElement>) => {
    // Enter visits the app, unless a link or button has focus and handles it natively.
    if (event.key === "Enter" && project && !event.repeat && !(event.target instanceof HTMLElement && event.target.closest("a, button"))) {
      event.preventDefault();
      window.open(project.url, "_blank", "noopener,noreferrer");
      return;
    }
    const direction = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    if (!direction || !project || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select")) return;
    const next = siblings[siblings.findIndex(item => item.title === project.title) + direction];
    event.preventDefault();
    if (next) onSelect(next);
  };
  return <Dialog open={project !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="project-full-dialog" onKeyDown={step} onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
      <DialogTitle className="sr-only">{project?.title ?? "Project"}</DialogTitle>
      <DialogDescription className="sr-only">{project?.description}</DialogDescription>
      {project && <ProjectCard key={project.title} project={project} index={0} fullView />}
    </DialogContent>
  </Dialog>;
}
