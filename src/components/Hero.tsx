import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroScene = lazy(() => import("./HeroScene"));

/**
 * The 3D scene is a lazily loaded chunk. If that chunk fails to arrive (a stale
 * or missing module after a dev-server restart), the rest of the page — title,
 * tagline and project cards — must still render instead of blanking out.
 */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // On phones the content follows the hero much sooner, so the title must
  // bow out faster and must not stay pinned over the category pills.
  const fadeDistance = isMobile ? 240 : 500;
  const scaleFloor = isMobile ? 0.8 : 0.6;
  const opacity = Math.max(0, 1 - scrollY / fadeDistance);
  const scale = Math.max(scaleFloor, 1 - scrollY / (fadeDistance * 2.4));
  const sceneOpacity = Math.max(0, 1 - scrollY / (isMobile ? 320 : 700));
  const isSticky = !isMobile && scrollY < 500;

  return (
    <>
      {/* Fixed fullscreen background */}
      <div className="portfolio-backdrop fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-background/90 z-10" />
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Cinematic 3D scene */}
      <div
        className="fixed inset-x-0 top-0 h-[55vh] md:h-[75vh] z-[1] pointer-events-none transition-opacity duration-300"
        style={{ opacity: sceneOpacity }}
      >
        {!isMobile && <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </SceneBoundary>}
      </div>

      <section
        className={`${
          isSticky ? "sticky top-0" : "relative"
        } mobile-editorial-hero min-h-[42vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden py-12 md:py-20 z-10 transition-all duration-300`}
      >
        <div
          className="container mx-auto px-4 z-20 text-center animate-fade-in transition-all duration-500 ease-out"
          style={{ opacity, transform: `scale(${scale})` }}
        >
          <div className="mb-5 flex items-center justify-between text-xs text-muted-foreground md:hidden">
            <span className="text-foreground">ER / Portfolio</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Independent creations</span>
          </div>
          <h1 className="hero-title text-4xl mb-3 leading-tight font-extrabold md:text-7xl">
            <span className="block md:inline">Erwann's</span>{" "}<span className="block md:inline">projects<span className="text-primary md:hidden">.</span></span>
          </h1>
          <p className="text-sm text-foreground/80 max-w-2xl mx-auto font-light md:text-2xl drop-shadow-[0_2px_12px_hsl(var(--background))]">
            Crafting delightful experiences
          </p>
        </div>
      </section>
    </>
  );
};
