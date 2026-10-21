import { useEffect, useRef } from "react";
import { blob, setMood } from "./blobStore";

/** Invisible grab area kept over the orb by the scene; drag moves it, a tap pokes it. */
export const BlobHandle = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    blob.handle = el;
    let start: { x: number; y: number; ox: number; oy: number } | null = null;
    let dragging = false;
    const down = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      start = { x: e.clientX, y: e.clientY, ox: blob.offset.x, oy: blob.offset.y };
      dragging = false;
    };
    const move = (e: PointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!dragging && Math.hypot(dx, dy) > 6) { dragging = true; blob.moved = true; setMood("dragged"); }
      if (dragging) blob.offset = { x: start.ox + dx, y: start.oy + dy };
    };
    const up = () => {
      if (!start) return;
      setMood(dragging ? "relief" : "scared");
      start = null;
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      blob.handle = null;
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return <div ref={ref} className="blob-handle" role="img" aria-label="Draggable blob" />;
};
