import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["g"], label: "Grid view" },
  { keys: ["t"], label: "Timeline view" },
  { keys: ["f"], label: "Toggle filters" },
  { keys: ["1", "–", "7"], label: "Pick a category" },
  { keys: ["←", "→"], label: "Scroll the timeline" },
  { keys: ["Home", "End"], label: "Oldest / latest project" },
  { keys: ["↑", "↓", "←", "→"], label: "Move between grid icons" },
  { keys: ["Enter"], label: "Open the focused project" },
  { keys: ["Esc"], label: "Close dialog or filters" },
  { keys: ["?"], label: "Show this help" },
];

export function KeyboardHelp({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-sm">
      <DialogTitle>Keyboard shortcuts</DialogTitle>
      <DialogDescription className="sr-only">Keys that navigate the project gallery.</DialogDescription>
      <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
        {SHORTCUTS.map(({ keys, label }) => <div key={label} className="contents">
          <dt className="flex gap-1">{keys.map((key, i) => key === "–" ? <span key={i} aria-hidden="true">–</span> : <kbd key={i} className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-xs">{key}</kbd>)}</dt>
          <dd className="text-muted-foreground">{label}</dd>
        </div>)}
      </dl>
    </DialogContent>
  </Dialog>;
}
