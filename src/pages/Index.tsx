import { useMemo, useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { type Project } from "@/components/ProjectCard";
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
import bttfLogo from "@/assets/bttf-logo.jpg";
import emojiSearchHero from "@/assets/emoji-search-hero.jpg";
import bgEraserDemo from "@/assets/bg-eraser-demo.jpg";
import portfolioScreenshot from "@/assets/portfolio-screenshot.jpg";
import digitalWarScreenshot from "@/assets/digital-war-screenshot.jpg";
import scoresheetScreenshot from "@/assets/scoresheet-screenshot.jpg";
import souvenirsScreenshot from "@/assets/souvenirs-screenshot.jpg";
import wordbombScreenshot from "@/assets/wordbomb-screenshot.jpg";
import waquizzScreenshot from "@/assets/waquizz-screenshot.jpg";
import pokerPlanningScreenshot from "@/assets/poker-planning-screenshot.jpg";
import glowgridScreenshot from "@/assets/glowgrid-screenshot.jpg";
import voxalScreenshot from "@/assets/voxal-screenshot.jpg";
import bookmojiScreenshot from "@/assets/bookmoji-screenshot.jpg";
import makefileGameScreenshot from "@/assets/makefile-game-screenshot.jpg";
import mapmindQuestScreenshot from "@/assets/mapmind-quest-screenshot.jpg";
import awaleScreenshot from "@/assets/awale-screenshot.jpg";
import gyrollScreenshot from "@/assets/gyroll-screenshot.jpg";
import trampoVisionScreenshot from "@/assets/trampo-vision-screenshot.jpg";
import carlanderScreenshot from "@/assets/carlander-screenshot.jpg";
import kidDrawScreenshot from "@/assets/kid-draw-screenshot.jpg";
import loglintScreenshot from "@/assets/loglint-screenshot.jpg";
import phoneVerifScreenshot from "@/assets/phone-verif-screenshot.jpg";

const projects: Project[] = [{
  title: "Back to the Future Logo Generator",
  description: "Generate stunning logos in the iconic Back to the Future movie style.",
  longDescription: "Create amazing logos with the legendary Back to the Future aesthetic. Transform any text into the iconic yellow and orange movie-style logo with lightning effects and retro sci-fi vibes. Perfect for bringing that 1985 time-travel magic to your projects.",
  url: "https://bttf.erwann.app",
  image: bttfLogo,
  tags: ["Logo Generator", "Design", "Retro"],
  categories: ["Design", "Fun", "Tools"],
  date: "Jun 2025"
}, {
  title: "LogLint",
  description: "Smart log analysis and linting tool for developers.",
  longDescription: "A powerful tool designed to help developers analyze and lint their log files with ease. LogLint intelligently detects patterns, highlights issues, and provides actionable insights to improve code quality and debugging efficiency.",
  url: "https://logs.erwann.app",
  image: loglintScreenshot,
  tags: ["Developer Tools", "Analysis", "Productivity"],
  categories: ["Dev", "Tools"],
  date: "Jul 2025"
}, {
  title: "Phone Verification",
  description: "Revolutionary WhatsApp reverse verification - costless and secure.",
  longDescription: "A groundbreaking phone verification system using WhatsApp reverse verification technology. Completely costless and highly secure, this innovative approach eliminates SMS costs while providing robust authentication. Perfect for modern applications that need reliable phone verification without the hefty price tag.",
  url: "https://phone-verif.com",
  image: phoneVerifScreenshot,
  tags: ["WhatsApp", "Security", "Authentication"],
  categories: ["SaaS", "Dev", "Tools"],
  date: "Aug 2025"
}, {
  title: "Background Eraser",
  description: "AI-powered background removal tool with precision.",
  longDescription: "Remove backgrounds from images instantly with cutting-edge AI technology. Perfect for product photos, profile pictures, and creative projects. Features batch processing, high-resolution exports, and intelligent edge detection.",
  url: "https://bg.erwann.app",
  image: bgEraserDemo,
  tags: ["AI", "Image Processing", "Design"],
  categories: ["Tools", "Design"],
  date: "Sep 2025"
}, {
  title: "Emoji Search",
  description: "Find the perfect emoji instantly with smart search.",
  longDescription: "Never struggle to find the right emoji again. This intelligent search tool helps you discover and copy emojis quickly with keyword search, category filtering, and recent history tracking. Perfect for content creators and anyone who loves expressive communication.",
  url: "https://emoji-search.lovable.app",
  image: emojiSearchHero,
  tags: ["Utility", "Search", "Fun"],
  categories: ["Tools", "Fun"],
  date: "Oct 2025"
}, {
  title: "Digital War",
  description: "Strategic number battle game with tactical grid-based gameplay.",
  longDescription: "An engaging strategic board game where two players battle for control of the grid. Place your numbers strategically, capture opponent tiles, and dominate the battlefield. Features include undo moves, customizable grid sizes, and an action log to track the flow of battle. Test your tactical thinking in this addictive number-based strategy game.",
  url: "https://digital-war.erwann.app",
  image: digitalWarScreenshot,
  tags: ["Game", "Strategy", "Fun"],
  categories: ["Games", "Fun"],
  date: "Nov 2025"
}, {
  title: "WhatsQuiz",
  description: "Real-time multiplayer quiz game controlled through WhatsApp.",
  longDescription: "A fun and innovative multiplayer quiz platform where players answer questions via WhatsApp in real-time. Host or join games with friends, play solo with customizable difficulty and categories, and enjoy live scores with instant feedback. Features WhatsApp integration for seamless gameplay and easy setup in seconds.",
  url: "https://waquizz.lovable.app",
  image: waquizzScreenshot,
  tags: ["Game", "Quiz", "WhatsApp"],
  categories: ["Games", "Fun"],
  date: "Dec 2025"
}, {
  title: "BombWord",
  description: "Explosive multiplayer word party game - type fast or get blasted!",
  longDescription: "A thrilling real-time multiplayer word game where speed is everything. Create or join private rooms with up to 16 players, choose from multiple languages, and race against the clock to type words before the bomb explodes. Features training mode for solo practice and explosive fun for parties and game nights.",
  url: "https://wordbomb.lovable.app",
  image: wordbombScreenshot,
  tags: ["Game", "Multiplayer", "Word"],
  categories: ["Games", "Fun"],
  date: "Jan 2026"
}, {
  title: "Bookmoji",
  description: "Save and share bookmarks described with emojis — instant visual link recall.",
  longDescription: "A playful bookmark service where you save links with emoji descriptions instead of titles. Search your bookmarks by emoji, browse a visual grid of your favorite sites, and share collections with friends. No more forgetting why you saved that tab — the emojis tell the whole story at a glance.",
  url: "https://bookmoji.erwann.app",
  image: bookmojiScreenshot,
  tags: ["Bookmarks", "Emoji", "Productivity"],
  categories: ["Tools", "Fun"],
  date: "Jan 2026"
}, {
  title: "Life Journal",
  description: "Personal journaling app to capture and cherish life moments.",
  longDescription: "A beautiful life journaling application to document your memories, thoughts, and experiences. Features secure authentication with email/password or WhatsApp login, dark/light theme support, and a clean intuitive interface. Perfect for keeping a personal diary of your life's precious moments.",
  url: "https://souvenirs.erwann.app",
  image: souvenirsScreenshot,
  tags: ["Journal", "Personal", "Memories"],
  categories: ["Tools"],
  date: "Feb 2026"
}, {
  title: "ScoreKeeper",
  description: "Track scores for any game with flexible rules and multiple players.",
  longDescription: "A versatile score tracking app perfect for board games, card games, or any competitive activity. Add unlimited players, choose between highest or lowest wins rules, set target scores or fixed rounds, and keep a complete history of your game nights. Clean, intuitive interface makes score keeping effortless.",
  url: "https://score.erwann.app",
  image: scoresheetScreenshot,
  tags: ["Game", "Utility", "Tracker"],
  categories: ["Tools", "Games"],
  date: "Mar 2026"
}, {
  title: "Planning Poker",
  description: "Free real-time Planning Poker tool for agile teams.",
  longDescription: "A free, real-time Planning Poker tool for agile teams. No sign-up required — just create a session and start estimating. Features hidden votes, instant reveal, multiple card decks, and seamless team collaboration via shareable links.",
  url: "https://poker-planning.lovable.app",
  image: pokerPlanningScreenshot,
  tags: ["Agile", "Team", "Productivity"],
  categories: ["Dev", "Tools"],
  date: "Apr 2026"
}, {
  title: "GlowGrid",
  description: "Daily minimalist puzzle — light up the grid in as few moves as possible.",
  longDescription: "A sleek daily logic puzzle inspired by the classic Lights Out. Tap a tile to toggle it and its neighbours, and try to light up the entire grid in the fewest moves. Includes a daily challenge, streak tracking, hints, replays and shareable results. Beautiful glowing UI with a calm, focused vibe.",
  url: "https://glow-grid.erwann.app",
  image: glowgridScreenshot,
  tags: ["Puzzle", "Daily", "Game"],
  categories: ["Games", "Fun"],
  date: "May 2026"
}, {
  title: "Voxal",
  description: "Team push-to-talk — walkie-talkie style voice chat, no meetings needed.",
  longDescription: "A real-time push-to-talk voice communication tool for teams. See who's online, drop into a channel, and talk instantly by holding a key — just like a walkie-talkie. No meetings, no scheduling, zero friction. Create rooms in seconds with no accounts or downloads required.",
  url: "https://www.voxal.app",
  image: voxalScreenshot,
  tags: ["Voice", "Team", "Real-time"],
  categories: ["SaaS", "Tools"],
  date: "Jun 2026"
}, {
  title: "Makefile Games",
  description: "A collection of terminal games written entirely in GNU Make — just `make` and play.",
  longDescription: "Ten classic games (Connect 4, Wordle, Minesweeper, Sokoban, Mastermind, Hangman, Tic-Tac-Toe, Quizz, Guess the number, Weather) implemented purely in GNU Make. No compilation, no dependencies — clone the repo, run `make`, and pick a game from the interactive menu. A fun exploration of how far you can push a build system.",
  url: "https://github.com/ErwannRobin/makefile-game",
  image: makefileGameScreenshot,
  tags: ["Terminal", "Make", "Games"],
  categories: ["Games", "Dev", "Fun"],
  date: "Jun 2026"
}, {
  title: "MapMind Quest",
  description: "Explore the world, unlock continents, and conquer daily geography challenges.",
  longDescription: "A captivating geography adventure game where you travel across the globe, unlock continents level by level, and complete daily quests to earn rewards. Test your knowledge of countries, capitals, and landmarks in a beautifully animated world map with a charming explorer companion.",
  url: "https://mapmind-quest.lovable.app",
  image: mapmindQuestScreenshot,
  tags: ["Game", "Geography", "Adventure"],
  categories: ["Games", "Fun"],
  date: "Jul 2026"
}, {
  title: "Awalé",
  description: "The classic African seed-sowing strategy game — play online, vs AI, or with friends.",
  longDescription: "A polished digital version of Awalé, the centuries-old African seed-sowing board game of the oware family. Play quick matches at your level, face opponents online, challenge an AI with adjustable difficulty, or pass & play with a friend. Includes interactive tutorials to learn the rules, puzzle challenges to sharpen your tactics, and an ELO-based ranking system that grows with you.",
  url: "https://awale.erwann.app",
  image: awaleScreenshot,
  tags: ["Game", "Strategy", "Board"],
  categories: ["Games", "Fun"],
  date: "Aug 2026"
}, {
  title: "Gyroll",
  description: "Endless 3D marble run you steer by tilting your phone — how far can you go?",
  longDescription: "A sleek endless 3D marble runner where you steer a gleaming ball down a neon city track by tilting your phone. Chase distance, collect star power for speed boosts, and survive the daily run — fall and you restart at the last checkpoint. Simple to pick up, impossible to put down.",
  url: "https://gyroll.erwann.app",
  image: gyrollScreenshot,
  tags: ["Game", "3D", "Endless Runner"],
  categories: ["Games", "Fun"],
  date: "Sep 2026"
}, {
  title: "Kid Draw",
  description: "A blank sheet, fat crayon colours and stickers for toddlers to draw with their fingers.",
  longDescription: "A finger-first drawing sheet made for very small hands: a full-screen white canvas, ten chunky colour swatches and a tray of emoji stickers to stamp anywhere. No menus to learn, no wrong way to draw — everything happens by touch, so the first masterpiece takes about two seconds. Built as a calm, ad-free space little ones can hand back to you already finished.",
  url: "https://draw.erwann.app",
  image: kidDrawScreenshot,
  tags: ["Drawing", "Kids", "Touch"],
  categories: ["Fun", "Design"],
  date: "Oct 2026"
}, {
  title: "TrampoVision",
  description: "Film a trampoline set and get every skill named, scored and coached.",
  longDescription: "Point a camera at a trampoline set and TrampoVision does the judging: it names each skill, works out its difficulty, proposes an execution score and tells you what to fix. Everything runs in your browser — the video never leaves your device. Perfect for coaches and athletes who want instant, objective feedback on every bounce.",
  url: "https://trampo-vision.erwann.app",
  image: trampoVisionScreenshot,
  tags: ["AI", "Video Analysis", "Sports"],
  categories: ["Tools", "Fun"],
    date: "Oct 2026"
  }, {
    title: "Roadster Flight",
    description: "Launch a rocket-assisted roadster off monumental ramps above the clouds — then land it perfectly.",
    longDescription: "A cinematic 3D stunt game where you launch a rocket-assisted roadster off monumental ramps above the clouds, then fight gravity to bring it back down for a perfect landing. Drag to line up your approach, feel the boost, and nail the touchdown across three levels of increasing ambition.",
    url: "https://carlander.erwann.app",
    image: carlanderScreenshot,
    tags: ["Game", "3D", "Stunt"],
    categories: ["Games", "Fun"],
    date: "Oct 2026"
  }, {
    title: "Lovable Tools Portfolio",
  description: "This very portfolio showcasing all my Lovable creations.",
  longDescription: "A modern, elegant portfolio website built with Lovable to showcase all the tools and projects I've created. Features a clean design, smooth animations, dark/light mode support, and is easily extensible for future projects. Built with React, TypeScript, and Tailwind CSS.",
  url: window.location.href,
  image: portfolioScreenshot,
  tags: ["Portfolio", "React", "Lovable"],
  categories: ["Dev", "Design"],
  date: "May 2026"
}];

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
