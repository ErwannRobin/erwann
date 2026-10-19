import { useEffect, useRef } from "react";

type OrientationCtor = { requestPermission?: () => Promise<"granted" | "denied"> };

/** Light beam from the top of the screen that follows the phone's tilt. */
export const TiltLight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf = 0;
    let surfaces: HTMLElement[] = [];
    const collectSurfaces = () => {
      surfaces = Array.from(document.querySelectorAll<HTMLElement>(".project-tile, .art-project"));
    };
    collectSurfaces();
    const observer = new MutationObserver(collectSurfaces);
    observer.observe(document.body, { childList: true, subtree: true });

    const onOrient = (e: DeviceOrientationEvent) => {
      const g = Math.max(-45, Math.min(45, e.gamma ?? 0)); // left/right
      const b = Math.max(-30, Math.min(60, (e.beta ?? 30) - 30)); // forward/back
      target = { x: g / 45, y: b / 60 };
    };

    const tick = () => {
      const motion = reducedMotion.matches ? { x: 0, y: 0 } : target;
      cur.x += (motion.x - cur.x) * 0.08;
      cur.y += (motion.y - cur.y) * 0.08;
      root.style.setProperty("--tilt-x", `${50 + cur.x * 40}%`);
      root.style.setProperty("--tilt-y", `${-10 + cur.y * 15}%`);
      root.style.setProperty("--tilt-rot", `${cur.x * 18}deg`);
      const sourceX = window.innerWidth * (0.5 + cur.x * 0.4);
      const sourceY = window.innerHeight * (-0.1 + cur.y * 0.15);
      for (const surface of surfaces) {
        const rect = surface.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.width === 0) continue;
        const dx = sourceX - (rect.left + rect.width / 2);
        const dy = Math.max(80, rect.top + rect.height / 2 - sourceY);
        const direction = dx / Math.hypot(dx, dy);
        const intensity = Math.max(0.35, 0.95 - Math.hypot(dx, dy) / (window.innerHeight * 2.2));
        surface.style.setProperty("--card-light-x", `${50 + direction * 55}%`);
        surface.style.setProperty("--card-light-y", `${Math.max(-20, Math.min(60, (sourceY - rect.top) / rect.height * 100))}%`);
        surface.style.setProperty("--card-light-angle", `${180 + Math.atan2(dx, dy) * 180 / Math.PI}deg`);
        surface.style.setProperty("--card-light-strength", `${intensity}`);
        surface.style.setProperty("--card-light-edge", `${direction * -4}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const Ctor = (window as unknown as { DeviceOrientationEvent?: OrientationCtor }).DeviceOrientationEvent;
    const start = () => window.addEventListener("deviceorientation", onOrient);
    let askOnTap: (() => void) | null = null;
    if (Ctor?.requestPermission) {
      const requestPermission = Ctor.requestPermission.bind(Ctor);
      askOnTap = () => {
        requestPermission().then((r) => r === "granted" && start()).catch(() => {});
      };
      window.addEventListener("touchend", askOnTap, { once: true });
    } else start();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("deviceorientation", onOrient);
      if (askOnTap) window.removeEventListener("touchend", askOnTap);
      for (const surface of surfaces) {
        for (const property of ["--card-light-x", "--card-light-angle", "--card-light-strength", "--card-light-edge"]) {
          surface.style.removeProperty(property);
        }
      }
      for (const property of ["--tilt-x", "--tilt-y", "--tilt-rot"]) root.style.removeProperty(property);
    };
  }, []);

  return <div ref={ref} aria-hidden className="tilt-light" />;
};
