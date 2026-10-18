import { useEffect, useRef } from "react";

/** Soft neon light that trails the pointer (desktop only). */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    if (ref.current) ref.current.style.opacity = "1";
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.18), transparent 60%)" }}
    />
  );
};
