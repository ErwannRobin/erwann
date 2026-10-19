import { useEffect, useRef } from "react";
import { ProjectCard, type Project } from "./ProjectCard";

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  const gallery = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gallery.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".art-project"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const activeY = window.innerHeight * 0.5;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (motion.matches || rect.bottom < 0 || rect.top > window.innerHeight) {
          card.style.setProperty("--artwork-scroll-scale", "1");
          return;
        }
        const distance = Math.abs(rect.top + rect.height / 2 - activeY);
        const proximity = Math.max(0, 1 - distance / (activeY + rect.height / 2));
        const eased = proximity * proximity * (3 - 2 * proximity);
        card.style.setProperty("--artwork-scroll-scale", String(1 + eased * 0.06));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [projects]);

  return (
    <div ref={gallery} className="chronological-gallery max-w-7xl mx-auto">
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, index) => <li key={project.title}><ProjectCard project={project} index={index} /></li>)}
      </ol>
    </div>
  );
};
