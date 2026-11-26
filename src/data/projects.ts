import type { Project } from "@/components/ProjectCard";
import { projectRecords } from "./projectRecords";

const screenshots = import.meta.glob<string>("../assets/*.jpg", { eager: true, import: "default" });
const screenshotAssets = import.meta.glob<{ url: string }>("../assets/*.asset.json", { eager: true, import: "default" });

export const projects: Project[] = projectRecords.map(({ screenshot, ...record }) => {
  const image = screenshotAssets[`../assets/${screenshot}`]?.url ?? screenshots[`../assets/${screenshot}`];
  if (!image) throw new Error(`Missing screenshot asset: ${screenshot}`);
  return { ...record, image };
});
