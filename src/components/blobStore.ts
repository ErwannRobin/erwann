/** Shared, mutable state between the DOM drag handle and the 3D orb (read every frame, no re-renders). */
export type BlobMood = "idle" | "dragged" | "relief" | "scared";

export const blob = {
  mood: "idle" as BlobMood,
  moodSince: 0,
  /** Screen-space offset in px from the orb's resting position. */
  offset: { x: 0, y: 0 },
  moved: false,
  /** Handle element that the scene keeps centred on the orb. */
  handle: null as HTMLElement | null,
};

export const setMood = (mood: BlobMood) => {
  blob.mood = mood;
  blob.moodSince = performance.now();
};
