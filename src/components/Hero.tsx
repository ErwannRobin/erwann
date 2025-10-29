import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);
  const scale = Math.max(0.5, 1 - scrollY / 800);
  const isSticky = scrollY < 500;

  return (
    <>
      {/* Fixed fullscreen background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-background/80 z-10" />
        <img src={heroBg} alt="Hero background" className="w-full h-full object-cover" />
      </div>

      {/* Decorative gradient orbs */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse mx-0 my-0 px-0 py-0 z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000 z-0" />

      {/* Sticky header section */}
      <section className={`${isSticky ? 'sticky top-0' : 'relative'} min-h-[50vh] flex items-center justify-center overflow-hidden py-20 z-10 transition-all duration-300`}>
        {/* Content */}
        <div 
          className="container mx-auto px-4 z-20 text-center animate-fade-in transition-all duration-300"
          style={{ opacity, transform: `scale(${scale})` }}
        >
          <h1 className="text-3xl mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text leading-tight text-purple-50 font-bold md:text-6xl">
            Erwann's projects
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light md:text-2xl">
            Crafting delightful experiences with Lovable
          </p>
        </div>
      </section>
    </>
  );
};