import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, type Project } from "./ProjectCard";

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState({ previous: false, next: false });

  useEffect(() => {
    const container = gallery.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".art-project"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const activeY = window.innerHeight * 0.5;
      const viewport = container.getBoundingClientRect();
      const activeX = viewport.left + container.clientWidth / 2;
      setNavigation({ previous: container.scrollLeft > 2, next: container.scrollLeft + container.clientWidth < container.scrollWidth - 2 });
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const distance = desktop.matches
          ? Math.abs(rect.left + rect.width / 2 - activeX)
          : Math.abs(rect.top + rect.height / 2 - activeY);
        const visible = rect.bottom > 0 && rect.top < window.innerHeight && (!desktop.matches || (rect.right > viewport.left && rect.left < viewport.right));
        card.dataset.scrollActive = String(visible && distance < (desktop.matches ? rect.width : rect.height) * 0.55);
        if (motion.matches || !visible) {
          card.style.setProperty("--artwork-scroll-scale", "1");
          return;
        }
        const reach = desktop.matches ? container.clientWidth / 2 + rect.width / 2 : activeY + rect.height / 2;
        const proximity = Math.max(0, 1 - distance / reach);
        const eased = proximity * proximity * (3 - 2 * proximity);
        card.style.setProperty("--artwork-scroll-scale", String(1 + eased * 0.22));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    container.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      container.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [projects]);

  const scrollHistory = (direction: number) => {
    const container = gallery.current;
    if (!container) return;
    container.scrollBy({ left: direction * 368, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className="history-section max-w-7xl mx-auto" aria-label="Project history">
      <div className="history-navigation">
        <Button variant="outline" size="icon" disabled={!navigation.previous} onClick={() => scrollHistory(-1)} aria-label="Previous projects" title="Previous projects"><ArrowLeft /></Button>
        <Button variant="outline" size="icon" disabled={!navigation.next} onClick={() => scrollHistory(1)} aria-label="Next projects" title="Next projects"><ArrowRight /></Button>
      </div>
      <div ref={gallery} className="chronological-gallery history-scroll" role="region" aria-label="Chronological projects" tabIndex={0}>
        <ol className="history-track grid grid-cols-1 gap-5">
          {projects.map((project, index) => <li className="history-entry" key={project.title}>
            <div className="history-marker" aria-hidden="true"><span className="history-date">{project.date}</span><span className="history-dot" /></div>
            <ProjectCard project={project} index={index} />
          </li>)}
        </ol>
      </div>
    </section>
  );
};
