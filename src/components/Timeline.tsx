import { ProjectCard, type Project } from "./ProjectCard";

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, index) => <li key={project.title}><ProjectCard project={project} index={index} /></li>)}
      </ol>
    </div>
  );
};
