import { Hero } from "@/components/Hero";
import { ProjectCard, Project } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

// Project data - easily extensible for future projects
const projects: Project[] = [
  {
    title: "Back to the Future",
    description: "A nostalgic journey through time with an interactive experience.",
    longDescription: "An immersive web experience that takes you back to the iconic Back to the Future universe. Features interactive elements, timeline navigation, and beautifully crafted animations that bring the DeLorean time machine to life.",
    url: "https://bttf.lovable.app",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
    tags: ["Interactive", "Animation", "Nostalgia"],
  },
  {
    title: "LogLint",
    description: "Smart log analysis and linting tool for developers.",
    longDescription: "A powerful tool designed to help developers analyze and lint their log files with ease. LogLint intelligently detects patterns, highlights issues, and provides actionable insights to improve code quality and debugging efficiency.",
    url: "https://loglint.lovable.app",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Developer Tools", "Analysis", "Productivity"],
  },
  {
    title: "Phone Verification",
    description: "Seamless phone number verification service.",
    longDescription: "A reliable and secure phone verification system that makes user authentication simple and trustworthy. Features SMS verification, international number support, and developer-friendly API integration for modern applications.",
    url: "https://phone-verif.com",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    tags: ["Security", "Authentication", "API"],
  },
  {
    title: "Background Eraser",
    description: "AI-powered background removal tool with precision.",
    longDescription: "Remove backgrounds from images instantly with cutting-edge AI technology. Perfect for product photos, profile pictures, and creative projects. Features batch processing, high-resolution exports, and intelligent edge detection.",
    url: "https://bg-eraser.lovable.app",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    tags: ["AI", "Image Processing", "Design"],
  },
  {
    title: "Emoji Search",
    description: "Find the perfect emoji instantly with smart search.",
    longDescription: "Never struggle to find the right emoji again. This intelligent search tool helps you discover and copy emojis quickly with keyword search, category filtering, and recent history tracking. Perfect for content creators and anyone who loves expressive communication.",
    url: "https://emoji-search.lovable.app",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    tags: ["Utility", "Search", "Fun"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <ThemeToggle />
      
      <Hero />

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of tools and experiences built with passion and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.url} project={project} index={index} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
