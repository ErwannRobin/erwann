import { useEffect, useState } from "react";

// Horizontal axis only when the window is wider than tall; portrait windows get the vertical axis.
export const HORIZONTAL_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 1001/1000)";

export function useHorizontalTimeline() {
  const [horizontal, setHorizontal] = useState(() => window.matchMedia(HORIZONTAL_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(HORIZONTAL_QUERY);
    const onChange = () => setHorizontal(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return horizontal;
}
