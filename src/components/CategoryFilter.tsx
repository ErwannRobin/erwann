import { Sparkles, Gamepad2, Wrench, Code2, PartyPopper, Briefcase, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div className="editorial-filters flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-4 md:mb-10 animate-fade-in overflow-x-auto md:overflow-visible px-4 md:px-0 -mx-4 md:mx-0 py-1 md:py-0 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat, i) => {
        const Icon = categoryIcons[cat];
        const isActive = active === cat;
        return (
          <Button
            variant="ghost"
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            style={{ animationDelay: `${i * 60}ms` }}
            className={cn(
              "editorial-filter group relative inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
              "backdrop-blur-md transition-all duration-300 animate-slide-up overflow-hidden",
              "hover:-translate-y-0.5 hover:scale-105",
              isActive
                ? "border-primary/70 bg-primary/20 text-primary shadow-[0_0_30px_hsl(262_83%_58%_/_0.5)]"
                : "border-primary/20 bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "filter-wash absolute inset-0 -z-10 opacity-0 transition-opacity duration-300",
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
          </Button>
        );
      })}
    </div>
  );
};
