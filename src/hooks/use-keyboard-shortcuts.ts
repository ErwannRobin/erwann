import { useEffect, useRef } from "react";

export type ShortcutMap = Record<string, (event: KeyboardEvent) => void>;

/** True when the key press belongs to a text field, an open dialog or a native widget. */
function isBlocked(event: KeyboardEvent) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return true;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable || target.closest("input, textarea, select, [role='dialog'], [role='menu']")) return true;
  return false;
}

/** Global single-key shortcuts keyed by `event.key`; ignored while typing or when a dialog is open. */
export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const latest = useRef(shortcuts);
  latest.current = shortcuts;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const handler = latest.current[event.key];
      if (!handler || isBlocked(event)) return;
      // Space and Enter keep their native meaning on buttons and links.
      if ((event.key === " " || event.key === "Enter") && event.target instanceof HTMLElement && event.target.closest("a, button, summary")) return;
      event.preventDefault();
      handler(event);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
