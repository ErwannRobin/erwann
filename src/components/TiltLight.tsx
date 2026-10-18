import { useEffect, useRef } from "react";

type OrientationCtor = { requestPermission?: () => Promise<"granted" | "denied"> };

/** Light beam from the top of the screen that follows the phone's tilt. */
export const TiltLight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf = 0;

    const onOrient = (e: DeviceOrientationEvent) => {
      const g = Math.max(-45, Math.min(45, e.gamma ?? 0)); // left/right
      const b = Math.max(-30, Math.min(60, (e.beta ?? 30) - 30)); // forward/back
      target = { x: g / 45, y: b / 60 };
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      el.style.setProperty("--tilt-x", `${50 + cur.x * 40}%`);
      el.style.setProperty("--tilt-y", `${-10 + cur.y * 15}%`);
      el.style.setProperty("--tilt-rot", `${cur.x * 18}deg`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const Ctor = (window as unknown as { DeviceOrientationEvent?: OrientationCtor }).DeviceOrientationEvent;
    const start = () => window.addEventListener("deviceorientation", onOrient);
    let askOnTap: (() => void) | null = null;
    if (Ctor?.requestPermission) {
      askOnTap = () => {
        Ctor.requestPermission!().then((r) => r === "granted" && start()).catch(() => {});
        window.removeEventListener("touchend", askOnTap!);
      };
      window.addEventListener("touchend", askOnTap, { once: true });
    } else start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("deviceorientation", onOrient);
      if (askOnTap) window.removeEventListener("touchend", askOnTap);
    };
  }, []);

  return <div ref={ref} aria-hidden className="tilt-light" />;
};
