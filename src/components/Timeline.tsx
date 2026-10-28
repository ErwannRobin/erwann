import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ProjectDialog } from "./ProjectGrid";
import { Button } from "@/components/ui/button";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { ProjectCard, type Project } from "./ProjectCard";

// Horizontal axis only when the window is wider than tall; portrait windows get the vertical axis.
const HORIZONTAL_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 1001/1000)";

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState({ previous: false, next: false });
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [desktop, setDesktop] = useState(() => window.matchMedia(HORIZONTAL_QUERY).matches);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setSlot(document.getElementById("history-nav-slot"));
    const mq = window.matchMedia(HORIZONTAL_QUERY);
    const onChange = () => setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  // Desktop history reads left to right (oldest first) and opens on the most recent end.
  const ordered = desktop ? [...projects].reverse() : projects;
  useLayoutEffect(() => {
    const container = gallery.current;
    if (desktop && container) container.scrollLeft = container.scrollWidth;
  }, [desktop, projects]);

  useEffect(() => {
    const container = gallery.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(HORIZONTAL_QUERY);
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
  }, [projects, desktop]);

  const scrollHistory = (direction: number) => {
    const container = gallery.current;
    if (!container) return;
    container.scrollBy({ left: direction * 368, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const scrollToEdge = (end: boolean) => {
    const container = gallery.current;
    if (!container) return;
    container.scrollTo({ left: end ? container.scrollWidth : 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // Native scrolling already covers the vertical gallery, so only the horizontal axis needs keys.
  useKeyboardShortcuts(desktop ? {
    ArrowLeft: () => scrollHistory(-1),
    ArrowRight: () => scrollHistory(1),
    Home: () => scrollToEdge(false),
    End: () => scrollToEdge(true),
  } : {});

  const controls = <div className="history-controls" role="group" aria-label="Timeline navigation">
    <Button variant="outline" size="icon" disabled={!navigation.previous} onClick={() => scrollToEdge(false)} aria-label="Oldest projects" title="Oldest projects"><ChevronsLeft /></Button>
    <Button variant="outline" size="icon" disabled={!navigation.previous} onClick={() => scrollHistory(-1)} aria-label="Previous projects" title="Previous projects"><ArrowLeft /></Button>
    <Button variant="outline" size="icon" disabled={!navigation.next} onClick={() => scrollHistory(1)} aria-label="Next projects" title="Next projects"><ArrowRight /></Button>
    <Button variant="outline" size="icon" disabled={!navigation.next} onClick={() => scrollToEdge(true)} aria-label="Latest projects" title="Latest projects"><ChevronsRight /></Button>
  </div>;

  return (
    <section className="history-section" aria-label="Project history">
      {slot && createPortal(controls, slot)}
      <div ref={gallery} className="chronological-gallery history-scroll" role="region" aria-label="Chronological projects" tabIndex={0}>
        <ol className="history-track grid grid-cols-1 gap-5">
          {ordered.map((project, index) => <li className="history-entry" key={project.title}>
            <div className="history-marker" aria-hidden="true"><span className="history-date">{project.date}</span><span className="history-dot" /></div>
            <ProjectCard project={project} index={index} onOpen={el => { opener.current = el; setSelected(project); }} />
          </li>)}
        </ol>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} opener={opener} />
    </section>
  );
};
