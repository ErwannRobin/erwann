import { useMemo, useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { type Project } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { ProjectDialog, ProjectGrid } from "@/components/ProjectGrid";
import { CommandPalette, type PaletteCommand } from "@/components/CommandPalette";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { KeyboardHelp } from "@/components/KeyboardHelp";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useHorizontalTimeline } from "@/hooks/use-horizontal-timeline";
import { CursorGlow } from "@/components/CursorGlow";
import { TiltLight } from "@/components/TiltLight";
import { LayoutGrid, Clock, SlidersHorizontal, ChevronDown, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATEGORIES: Category[] = ["All", "SaaS", "Games", "Tools", "Dev", "Fun", "Design"];

type ViewMode = "grid" | "timeline";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [view, setView] = useState<ViewMode>("timeline");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const horizontal = useHorizontalTimeline();

  const counts = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = cat === "All" ? projects.length : projects.filter(p => p.categories.includes(cat as Exclude<Category, "All">)).length;
      return acc;
    }, {} as Record<Category, number>);
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory as Exclude<Category, "All">));

  const commands: PaletteCommand[] = [
    { id: "grid", group: "View", label: "Grid view", key: "g", icon: <LayoutGrid className="h-4 w-4" />, run: () => setView("grid") },
    { id: "timeline", group: "View", label: "Timeline view", key: "t", icon: <Clock className="h-4 w-4" />, run: () => setView("timeline") },
    { id: "filters", group: "View", label: "Toggle filters", key: "f", icon: <SlidersHorizontal className="h-4 w-4" />, run: () => setFiltersOpen(value => !value) },
    ...CATEGORIES.map((cat, i) => ({ id: `category-${cat}`, group: "Category", label: `Show ${cat}`, key: String(i + 1), run: () => setActiveCategory(cat) })),
    { id: "help", group: "Help", label: "Keyboard shortcuts", key: "?", icon: <Keyboard className="h-4 w-4" />, run: () => setHelpOpen(true) },
  ];
  useKeyboardShortcuts({
    ...Object.fromEntries(commands.filter(command => command.key).map(command => [command.key!, command.run])),
    Escape: () => setFiltersOpen(false),
  });

  const openProject = (project: Project, el: HTMLElement | null) => {
    opener.current = el;
    setSelected(project);
  };

  const timelineProjects = useMemo(() => {
    const monthOrder: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const parseDate = (d: string) => {
      const [m, y] = d.split(" ");
      return (parseInt(y, 10) * 12 + (monthOrder[m] ?? 0));
    };
    // Same-month projects keep their array order: later in the array = more recent.
    return filtered
      .map((project, index) => ({ project, index }))
      .sort((a, b) => parseDate(b.project.date) - parseDate(a.project.date) || b.index - a.index)
      .map(({ project }) => project);
  }, [filtered]);

  // Dialog arrows follow what is on screen: the horizontal timeline reads oldest first.
  const displayed = view === "grid" ? filtered : horizontal ? [...timelineProjects].reverse() : timelineProjects;

  return <div className="min-h-screen relative">
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring">Skip to projects</a>
      <CursorGlow />
      <TiltLight />
      <Hero />

      <section id="projects" tabIndex={-1} className="editorial-projects focus:outline-none container mx-auto px-4 py-16 relative z-10">
        {/* View toggle */}
        <div className="gallery-toolbar relative flex flex-wrap items-center justify-between gap-3 mb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setFiltersOpen(value => !value)} aria-expanded={filtersOpen} aria-controls="project-filters" className="gap-2 bg-background/40 backdrop-blur-md">
              <SlidersHorizontal className="h-4 w-4" /><span>{activeCategory === "All" ? "Filter" : activeCategory}</span><ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} />
            </Button>
            <span className="text-xs text-muted-foreground">{filtered.length} projects</span>
          </div>
          {view === "timeline" && <div id="history-nav-slot" className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2" />}
          <div className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-background/40 backdrop-blur-md p-1">
            {([
              { id: "grid", label: "Grid", Icon: LayoutGrid },
              { id: "timeline", label: "Timeline", Icon: Clock },
            ] as const).map(({ id, label, Icon }) => {
              const isActive = view === id;
              return (
                <Button
                  variant="ghost"
                  key={id}
                  onClick={() => setView(id)}
                  aria-pressed={isActive}
                  aria-label={label}
                  title={label}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div id="project-filters" hidden={!filtersOpen}>
          <CategoryFilter categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} counts={counts} />
        </div>

        {view === "grid" ? (
          <ProjectGrid key={`grid-${activeCategory}`} projects={filtered} onOpen={openProject} />
        ) : (
          <div key={`timeline-${activeCategory}`} className="animate-fade-in">
            <Timeline projects={timelineProjects} onOpen={openProject} />
          </div>
        )}
      </section>

      <Footer />
      <ProjectDialog project={selected} siblings={selected && !displayed.includes(selected) ? [selected] : displayed} onSelect={setSelected} onClose={() => setSelected(null)} opener={opener} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} commands={commands} projects={projects} onOpenProject={project => openProject(project, null)} />
      <KeyboardHelp open={helpOpen} onOpenChange={setHelpOpen} />
    </div>;
};
export default Index;
