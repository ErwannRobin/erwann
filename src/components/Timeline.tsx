import { ExternalLink } from "lucide-react";
import { Project } from "./ProjectCard";

interface TimelineProps {
  projects: Project[];
}

export const Timeline = ({ projects }: TimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto py-6">
      {/* Center vertical line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-primary/60 to-transparent"
        aria-hidden
      />

      <ol className="space-y-10 md:space-y-14">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={project.url}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Dot */}
              <div
                className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10"
                aria-hidden
              >
                <div className="relative">
                  <div className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_20px_hsl(262_83%_58%_/_0.9),0_0_40px_hsl(280_70%_65%_/_0.5)]" />
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                </div>
              </div>

              <div
                className={`pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${
                  isLeft ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div
                  className={`group relative rounded-xl border border-primary/30 backdrop-blur-md p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_60px_hsl(262_83%_58%_/_0.6)] ${
                    isLeft ? "md:text-right md:mr-2" : "md:ml-2"
                  }`}
                  style={{ background: "rgba(15, 15, 25, 0.4)" }}
                >
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      isLeft ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-primary/80">
                      {project.date}
                    </span>
                  </div>

                  <div
                    className={`flex items-start gap-3 mb-2 ${
                      isLeft ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-primary/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex flex-wrap gap-1.5 mt-3 ${
                      isLeft ? "md:justify-end" : ""
                    }`}
                  >
                    {project.categories.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/15 text-primary border border-primary/25"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors ${
                      isLeft ? "md:float-right" : ""
                    }`}
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
