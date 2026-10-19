import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProjectCard, type Project } from "./ProjectCard";
import { projectIcons } from "./projectIcons";

function ProjectIcon({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return <img src={!failed && projectIcons[project.title] ? projectIcons[project.title] : project.image} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className="project-tile-icon" />;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  return <>
    <div className="project-icon-grid max-w-7xl mx-auto">
      {projects.map(project => <Button key={project.title} variant="ghost" className="project-tile" onClick={event => { opener.current = event.currentTarget; setSelected(project); }} aria-label={`Open ${project.title}`} aria-haspopup="dialog">
        <ProjectIcon project={project} />
        <span className="project-tile-name">{project.title}</span>
      </Button>)}
    </div>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="project-full-dialog" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus(); }}>
        <DialogTitle className="sr-only">{selected?.title ?? "Project"}</DialogTitle>
        <DialogDescription className="sr-only">{selected?.description}</DialogDescription>
        {selected && <ProjectCard key={selected.title} project={selected} index={0} fullView />}
      </DialogContent>
    </Dialog>
  </>;
}