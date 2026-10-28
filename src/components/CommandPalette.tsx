import { useEffect, type ReactNode } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "./ProjectCard";

export interface PaletteCommand {
  id: string;
  label: string;
  group: string;
  /** Single-key shortcut, also bound globally by the page. */
  key?: string;
  icon?: ReactNode;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: PaletteCommand[];
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

/** Cmd/Ctrl+K palette: filterable commands (with their shortcuts) and projects. */
export function CommandPalette({ open, onOpenChange, commands, projects, onOpenProject }: CommandPaletteProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      event.preventDefault();
      onOpenChange(!open);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const select = (action: () => void) => {
    onOpenChange(false);
    action();
  };
  const groups = Array.from(new Set(commands.map(command => command.group)));

  return <CommandDialog open={open} onOpenChange={onOpenChange}>
    <DialogTitle className="sr-only">Command menu</DialogTitle>
    <DialogDescription className="sr-only">Search commands and projects.</DialogDescription>
    <CommandInput placeholder="Search commands and projects…" />
    <CommandList>
      <CommandEmpty>No results.</CommandEmpty>
      {groups.map(group => <CommandGroup key={group} heading={group}>
        {commands.filter(command => command.group === group).map(command => <CommandItem key={command.id} value={`${group} ${command.label}`} onSelect={() => select(command.run)}>
          {command.icon && <span aria-hidden="true" className="mr-2 inline-flex">{command.icon}</span>}
          <span>{command.label}</span>
          {command.key && <CommandShortcut><kbd className="font-mono">{command.key}</kbd></CommandShortcut>}
        </CommandItem>)}
      </CommandGroup>)}
      <CommandGroup heading="Projects">
        {projects.map(project => <CommandItem key={project.title} value={`project ${project.title} ${project.description} ${project.categories.join(" ")}`} onSelect={() => select(() => onOpenProject(project))}>
          <span>{project.title}</span>
          <CommandShortcut>{project.date}</CommandShortcut>
        </CommandItem>)}
      </CommandGroup>
    </CommandList>
  </CommandDialog>;
}
