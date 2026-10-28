import { useRef, useState, type KeyboardEvent, type MutableRefObject } from "react";
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

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  return <>
    <div className="project-icon-grid max-w-7xl mx-auto" onKeyDown={moveFocus}>
      {projects.map(project => <Button key={project.title} variant="ghost" className="project-tile" onClick={event => { opener.current = event.currentTarget; setSelected(project); }} aria-label={`Open ${project.title}`} aria-haspopup="dialog">
        <ProjectIcon project={project} />
        <span className="project-tile-name">{project.title}</span>
      </Button>)}
    </div>
    <ProjectDialog project={selected} onClose={() => setSelected(null)} opener={opener} />
  </>;
}

/** Full project view with the 3D twirl; returns focus to whatever opened it. */
export function ProjectDialog({ project, onClose, opener }: { project: Project | null; onClose: () => void; opener: MutableRefObject<HTMLElement | null> }) {
  return <Dialog open={project !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="project-full-dialog" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
      <DialogTitle className="sr-only">{project?.title ?? "Project"}</DialogTitle>
      <DialogDescription className="sr-only">{project?.description}</DialogDescription>
      {project && <ProjectCard key={project.title} project={project} index={0} fullView />}
    </DialogContent>
  </Dialog>;
}
