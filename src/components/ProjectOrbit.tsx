import collectibles from "@/assets/project-orbit-collectibles.png";
import { Button } from "@/components/ui/button";

const objects = [
  { title: "Gyroll", sprite: "marble" },
  { title: "Awalé", sprite: "seeds" },
  { title: "Roadster Flight", sprite: "car" },
  { title: "Bookmoji", sprite: "bookmark" },
];

export const ProjectOrbit = ({ onSelect }: { onSelect: (title: string) => void }) => (
  <div className="project-orbit" aria-label="Explore projects">
    {objects.map(({ title, sprite }) => (
      <div className={`orbit-slot orbit-${sprite}`} key={title}>
        <Button variant="ghost" size="icon" className="orbit-collectible" aria-label={`Explore ${title}`} onClick={() => onSelect(title)}>
          <span className={`collectible-sprite sprite-${sprite}`} aria-hidden="true">
            <img src={collectibles} alt="" width={1024} height={1024} />
          </span>
          <span className="collectible-label">{title}</span>
        </Button>
      </div>
    ))}
  </div>
);