import marble from "@/assets/orbit-marble.png";
import seeds from "@/assets/orbit-seeds.png";
import car from "@/assets/orbit-car.png";
import bookmark from "@/assets/orbit-bookmark.png";
import { Button } from "@/components/ui/button";

const objects = [
  { title: "Gyroll", sprite: "marble", image: marble },
  { title: "Awalé", sprite: "seeds", image: seeds },
  { title: "Roadster Flight", sprite: "car", image: car },
  { title: "Bookmoji", sprite: "bookmark", image: bookmark },
];

export const ProjectOrbit = ({ onSelect }: { onSelect: (title: string) => void }) => (
  <div className="project-orbit" aria-label="Explore projects">
    {objects.map(({ title, sprite, image }) => (
      <div className={`orbit-slot orbit-${sprite}`} key={title}>
        <Button variant="ghost" size="icon" className="orbit-collectible" aria-label={`Explore ${title}`} onClick={() => onSelect(title)}>
          <span className={`collectible-sprite sprite-${sprite}`} aria-hidden="true">
            <img src={image} alt="" width={512} height={512} />
          </span>
          <span className="collectible-label">{title}</span>
        </Button>
      </div>
    ))}
  </div>
);