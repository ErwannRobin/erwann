import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { LayoutGrid, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import bttfLogo from "@/assets/bttf-logo.jpg";
import emojiSearchHero from "@/assets/emoji-search-hero.png";
import bgEraserDemo from "@/assets/bg-eraser-demo.png";
import portfolioScreenshot from "@/assets/portfolio-screenshot.png";
import digitalWarScreenshot from "@/assets/digital-war-screenshot.png";
import scoresheetScreenshot from "@/assets/scoresheet-screenshot.png";
import souvenirsScreenshot from "@/assets/souvenirs-screenshot.png";
import wordbombScreenshot from "@/assets/wordbomb-screenshot.png";
import waquizzScreenshot from "@/assets/waquizz-screenshot.png";
import pokerPlanningScreenshot from "@/assets/poker-planning-screenshot.png";
import glowgridScreenshot from "@/assets/glowgrid-screenshot.png";
import voxalScreenshot from "@/assets/voxal-screenshot.png";

const projects: Project[] = [{
  title: "Back to the Future Logo Generator",
  description: "Generate stunning logos in the iconic Back to the Future movie style.",
  longDescription: "Create amazing logos with the legendary Back to the Future aesthetic. Transform any text into the iconic yellow and orange movie-style logo with lightning effects and retro sci-fi vibes. Perfect for bringing that 1985 time-travel magic to your projects.",
  url: "https://bttf.lovable.app",
  image: bttfLogo,
  tags: ["Logo Generator", "Design", "Retro"],
  categories: ["Design", "Fun", "Tools"],
  date: "Jun 2025"
}, {
  title: "LogLint",
  description: "Smart log analysis and linting tool for developers.",
  longDescription: "A powerful tool designed to help developers analyze and lint their log files with ease. LogLint intelligently detects patterns, highlights issues, and provides actionable insights to improve code quality and debugging efficiency.",
  url: "https://loglint.lovable.app",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  tags: ["Developer Tools", "Analysis", "Productivity"],
  categories: ["Dev", "Tools"],
  date: "Jul 2025"
}, {
  title: "Phone Verification",
  description: "Revolutionary WhatsApp reverse verification - costless and secure.",
  longDescription: "A groundbreaking phone verification system using WhatsApp reverse verification technology. Completely costless and highly secure, this innovative approach eliminates SMS costs while providing robust authentication. Perfect for modern applications that need reliable phone verification without the hefty price tag.",
  url: "https://phone-verif.com",
  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
  tags: ["WhatsApp", "Security", "Authentication"],
  categories: ["SaaS", "Dev", "Tools"],
  date: "Aug 2025"
}, {
  title: "Background Eraser",
  description: "AI-powered background removal tool with precision.",
  longDescription: "Remove backgrounds from images instantly with cutting-edge AI technology. Perfect for product photos, profile pictures, and creative projects. Features batch processing, high-resolution exports, and intelligent edge detection.",
  url: "https://bg-eraser.lovable.app",
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
  url: "https://digital-war.lovable.app",
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
  title: "Life Journal",
  description: "Personal journaling app to capture and cherish life moments.",
  longDescription: "A beautiful life journaling application to document your memories, thoughts, and experiences. Features secure authentication with email/password or WhatsApp login, dark/light theme support, and a clean intuitive interface. Perfect for keeping a personal diary of your life's precious moments.",
  url: "https://souvenirs.lovable.app",
  image: souvenirsScreenshot,
  tags: ["Journal", "Personal", "Memories"],
  categories: ["Tools"],
  date: "Feb 2026"
}, {
  title: "ScoreKeeper",
  description: "Track scores for any game with flexible rules and multiple players.",
  longDescription: "A versatile score tracking app perfect for board games, card games, or any competitive activity. Add unlimited players, choose between highest or lowest wins rules, set target scores or fixed rounds, and keep a complete history of your game nights. Clean, intuitive interface makes score keeping effortless.",
  url: "https://scoresheet.lovable.app",
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
  url: "https://glow-grid.vercel.app",
  image: glowgridScreenshot,
  tags: ["Puzzle", "Daily", "Game"],
  categories: ["Games", "Fun"],
  date: "May 2026"
}, {
  title: "Voxal",
  description: "Lightweight presence layer for teams — see who's online and push-to-talk instantly.",
  longDescription: "Voxal is a lightweight presence layer for teams. Know who's available, drop into a channel, and push-to-talk — no meetings, no scheduling, no friction. Features real-time presence, push-to-talk voice, and zero-setup room creation with no accounts or downloads required.",
  url: "https://www.voxal.app",
  image: voxalScreenshot,
  tags: ["Voice", "Team", "Real-time"],
  categories: ["SaaS", "Tools"],
  date: "Jun 2026"
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
  const [view, setView] = useState<ViewMode>("grid");

  const counts = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = cat === "All" ? projects.length : projects.filter(p => p.categories.includes(cat as Exclude<Category, "All">)).length;
      return acc;
    }, {} as Record<Category, number>);
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory as Exclude<Category, "All">));

  const timelineProjects = useMemo(
    () => [...filtered].reverse(),
    [filtered]
  );

  return <div className="min-h-screen relative">
      <Hero />

      <section className="container mx-auto px-4 py-16 relative z-10">
        <CategoryFilter
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />

        {/* View toggle */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-background/40 backdrop-blur-md p-1">
            {([
              { id: "grid", label: "Grid", Icon: LayoutGrid },
              { id: "timeline", label: "Timeline", Icon: Clock },
            ] as const).map(({ id, label, Icon }) => {
              const isActive = view === id;
              return (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary shadow-[0_0_20px_hsl(262_83%_58%_/_0.5)]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {view === "grid" ? (
          <div
            key={`grid-${activeCategory}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-fade-in"
          >
            {filtered.map((project, index) => <ProjectCard key={project.url} project={project} index={index} />)}
          </div>
        ) : (
          <div key={`timeline-${activeCategory}`} className="animate-fade-in">
            <Timeline projects={timelineProjects} />
          </div>
        )}
      </section>

      <Footer />
    </div>;
};
export default Index;
