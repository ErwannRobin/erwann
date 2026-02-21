import { Hero } from "@/components/Hero";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import bttfLogo from "@/assets/bttf-logo.jpg";
import emojiSearchHero from "@/assets/emoji-search-hero.png";
import bgEraserDemo from "@/assets/bg-eraser-demo.png";
import portfolioScreenshot from "@/assets/portfolio-screenshot.png";
import digitalWarScreenshot from "@/assets/digital-war-screenshot.png";
import scoresheetScreenshot from "@/assets/scoresheet-screenshot.png";
import souvenirsScreenshot from "@/assets/souvenirs-screenshot.png";
import wordbombScreenshot from "@/assets/wordbomb-screenshot.png";
import waquizzScreenshot from "@/assets/waquizz-screenshot.png";

// Project data - easily extensible for future projects
const projects: Project[] = [{
  title: "Back to the Future Logo Generator",
  description: "Generate stunning logos in the iconic Back to the Future movie style.",
  longDescription: "Create amazing logos with the legendary Back to the Future aesthetic. Transform any text into the iconic yellow and orange movie-style logo with lightning effects and retro sci-fi vibes. Perfect for bringing that 1985 time-travel magic to your projects.",
  url: "https://bttf.lovable.app",
  image: bttfLogo,
  tags: ["Logo Generator", "Design", "Retro"]
}, {
  title: "LogLint",
  description: "Smart log analysis and linting tool for developers.",
  longDescription: "A powerful tool designed to help developers analyze and lint their log files with ease. LogLint intelligently detects patterns, highlights issues, and provides actionable insights to improve code quality and debugging efficiency.",
  url: "https://loglint.lovable.app",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  tags: ["Developer Tools", "Analysis", "Productivity"]
}, {
  title: "Phone Verification",
  description: "Revolutionary WhatsApp reverse verification - costless and secure.",
  longDescription: "A groundbreaking phone verification system using WhatsApp reverse verification technology. Completely costless and highly secure, this innovative approach eliminates SMS costs while providing robust authentication. Perfect for modern applications that need reliable phone verification without the hefty price tag.",
  url: "https://phone-verif.com",
  image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
  tags: ["WhatsApp", "Security", "Authentication"]
}, {
  title: "Background Eraser",
  description: "AI-powered background removal tool with precision.",
  longDescription: "Remove backgrounds from images instantly with cutting-edge AI technology. Perfect for product photos, profile pictures, and creative projects. Features batch processing, high-resolution exports, and intelligent edge detection.",
  url: "https://bg-eraser.lovable.app",
  image: bgEraserDemo,
  tags: ["AI", "Image Processing", "Design"]
}, {
  title: "Emoji Search",
  description: "Find the perfect emoji instantly with smart search.",
  longDescription: "Never struggle to find the right emoji again. This intelligent search tool helps you discover and copy emojis quickly with keyword search, category filtering, and recent history tracking. Perfect for content creators and anyone who loves expressive communication.",
  url: "https://emoji-search.lovable.app",
  image: emojiSearchHero,
  tags: ["Utility", "Search", "Fun"]
}, {
  title: "Digital War",
  description: "Strategic number battle game with tactical grid-based gameplay.",
  longDescription: "An engaging strategic board game where two players battle for control of the grid. Place your numbers strategically, capture opponent tiles, and dominate the battlefield. Features include undo moves, customizable grid sizes, and an action log to track the flow of battle. Test your tactical thinking in this addictive number-based strategy game.",
  url: "https://digital-war.lovable.app",
  image: digitalWarScreenshot,
  tags: ["Game", "Strategy", "Fun"]
}, {
  title: "WhatsQuiz",
  description: "Real-time multiplayer quiz game controlled through WhatsApp.",
  longDescription: "A fun and innovative multiplayer quiz platform where players answer questions via WhatsApp in real-time. Host or join games with friends, play solo with customizable difficulty and categories, and enjoy live scores with instant feedback. Features WhatsApp integration for seamless gameplay and easy setup in seconds.",
  url: "https://waquizz.lovable.app",
  image: waquizzScreenshot,
  tags: ["Game", "Quiz", "WhatsApp"]
}, {
  title: "BombWord",
  description: "Explosive multiplayer word party game - type fast or get blasted!",
  longDescription: "A thrilling real-time multiplayer word game where speed is everything. Create or join private rooms with up to 16 players, choose from multiple languages, and race against the clock to type words before the bomb explodes. Features training mode for solo practice and explosive fun for parties and game nights.",
  url: "https://wordbomb.lovable.app",
  image: wordbombScreenshot,
  tags: ["Game", "Multiplayer", "Word"]
}, {
  title: "Life Journal",
  description: "Personal journaling app to capture and cherish life moments.",
  longDescription: "A beautiful life journaling application to document your memories, thoughts, and experiences. Features secure authentication with email/password or WhatsApp login, dark/light theme support, and a clean intuitive interface. Perfect for keeping a personal diary of your life's precious moments.",
  url: "https://souvenirs.lovable.app",
  image: souvenirsScreenshot,
  tags: ["Journal", "Personal", "Memories"]
}, {
  title: "ScoreKeeper",
  description: "Track scores for any game with flexible rules and multiple players.",
  longDescription: "A versatile score tracking app perfect for board games, card games, or any competitive activity. Add unlimited players, choose between highest or lowest wins rules, set target scores or fixed rounds, and keep a complete history of your game nights. Clean, intuitive interface makes score keeping effortless.",
  url: "https://scoresheet.lovable.app",
  image: scoresheetScreenshot,
  tags: ["Game", "Utility", "Tracker"]
}, {
  title: "Lovable Tools Portfolio",
  description: "This very portfolio showcasing all my Lovable creations.",
  longDescription: "A modern, elegant portfolio website built with Lovable to showcase all the tools and projects I've created. Features a clean design, smooth animations, dark/light mode support, and is easily extensible for future projects. Built with React, TypeScript, and Tailwind CSS.",
  url: window.location.href,
  image: portfolioScreenshot,
  tags: ["Portfolio", "React", "Lovable"]
}];
const Index = () => {
  return <div className="min-h-screen relative">
      <Hero />

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => <ProjectCard key={project.url} project={project} index={index} />)}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;