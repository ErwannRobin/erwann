import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { BlobHandle } from "./BlobHandle";
import { blob } from "./blobStore";

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

/** Phones — including landscape ones, too short to keep the title pinned over the grid. */
const PHONE_QUERY = "(max-width: 767px), (orientation: landscape) and (max-height: 520px) and (max-width: 1023px)";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(PHONE_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fadeDistance = isMobile ? 160 : 260;
  const opacity = Math.max(0, 1 - scrollY / fadeDistance);
  const scale = Math.max(0.7, 1 - scrollY / (fadeDistance * 2));
  const compact = Math.min(1, Math.max(0, (scrollY - fadeDistance * 0.6) / 80));
  const sceneOpacity = blob.moved ? 1 : Math.max(0, 1 - scrollY / (isMobile ? 320 : 700));

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
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-300"
        style={{ opacity: sceneOpacity }}
      >
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="fixed inset-0 z-30 pointer-events-none" style={{ opacity: sceneOpacity, visibility: sceneOpacity > 0.05 ? "visible" : "hidden" }}>
        <BlobHandle />
      </div>

      {/* Compact title that stays visible once the page scrolls */}
      <div
        className="hero-compact fixed inset-x-0 top-0 z-40 flex justify-center py-2 pointer-events-none"
        style={{ opacity: compact, transform: `translateY(${(compact - 1) * 12}px)` }}
        aria-hidden={compact < 0.5}
      >
        <span className="hero-title text-lg md:text-2xl font-extrabold">Erwann's projects</span>
      </div>

      <section className="mobile-editorial-hero relative flex justify-center pt-6 pb-10 md:pt-8 md:pb-16 min-h-[30vh] md:min-h-[36vh] z-10">
        <div
          className="container mx-auto px-4 z-20 text-center animate-fade-in"
          style={{ opacity, transform: `scale(${scale})`, transformOrigin: "top center" }}
        >
          <h1 className="hero-title text-4xl mb-3 leading-tight font-extrabold md:text-7xl">
            Erwann's projects
          </h1>
          <p className="text-sm text-foreground/80 max-w-2xl mx-auto font-light md:text-2xl drop-shadow-[0_2px_12px_hsl(var(--background))]">
            Crafting delightful experiences
          </p>
        </div>
      </section>
    </>
  );
};
