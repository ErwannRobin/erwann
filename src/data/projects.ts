import type { Project } from "@/components/ProjectCard";
import { projectRecords } from "./projectRecords";

const screenshots = import.meta.glob<string>("../assets/*.jpg", { eager: true, import: "default" });

export const projects: Project[] = projectRecords.map(({ screenshot, ...record }) => {
  const image = screenshots[`../assets/${screenshot}`];
  if (!image) throw new Error(`Missing screenshot asset: ${screenshot}`);
  return { ...record, image };
});
