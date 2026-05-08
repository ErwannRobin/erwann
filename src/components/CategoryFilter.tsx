import { Sparkles, Gamepad2, Wrench, Code2, PartyPopper, Briefcase, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export type Category = "All" | "SaaS" | "Games" | "Tools" | "Dev" | "Fun" | "Design";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  SaaS: Briefcase,
  Games: Gamepad2,
  Tools: Wrench,
  Dev: Code2,
  Fun: PartyPopper,
  Design: Sparkles,
};

interface CategoryFilterProps {
  categories: Category[];
  active: Category;
  onChange: (c: Category) => void;
  counts: Record<Category, number>;
}

export const CategoryFilter = ({ categories, active, onChange, counts }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 animate-fade-in">
      {categories.map((cat, i) => {
        const Icon = categoryIcons[cat];
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{ animationDelay: `${i * 60}ms` }}
            className={cn(
              "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
              "backdrop-blur-md transition-all duration-300 animate-slide-up overflow-hidden",
              "hover:-translate-y-0.5 hover:scale-105",
              isActive
                ? "border-primary/70 bg-primary/20 text-primary shadow-[0_0_30px_hsl(262_83%_58%_/_0.5)]"
                : "border-primary/20 bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 via-purple-500/20 to-pink-500/30 opacity-0 transition-opacity duration-300",
                isActive ? "opacity-100" : "group-hover:opacity-60"
              )}
            />
            <Icon className={cn("h-4 w-4 transition-transform duration-300", isActive && "scale-110")} />
            <span>{cat}</span>
            <span
              className={cn(
                "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                isActive ? "bg-primary/30 text-primary" : "bg-muted/40 text-muted-foreground"
              )}
            >
              {counts[cat]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
