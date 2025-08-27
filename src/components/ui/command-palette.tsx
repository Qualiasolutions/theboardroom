"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  Layout, 
  Home, 
  FileText, 
  Handshake,
  Target,
  MessageSquare,
  Calendar,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: Command[] = [
    {
      id: "dashboard",
      label: "Go to Dashboard",
      shortcut: "⌘ D",
      icon: Home,
      action: () => router.push("/dashboard"),
      category: "Navigation"
    },
    {
      id: "boardroom",
      label: "Go to Boardroom",
      shortcut: "⌘ B",
      icon: Layout,
      action: () => router.push("/boardroom"),
      category: "Navigation"
    },
    {
      id: "rooms",
      label: "Go to Rooms",
      shortcut: "⌘ R",
      icon: Users,
      action: () => router.push("/rooms"),
      category: "Navigation"
    },
    {
      id: "introductions",
      label: "Go to Introductions",
      shortcut: "⌘ I",
      icon: Handshake,
      action: () => router.push("/introductions"),
      category: "Navigation"
    },
    {
      id: "briefings",
      label: "Go to Briefings",
      shortcut: "⌘ Shift B",
      icon: FileText,
      action: () => router.push("/briefings"),
      category: "Navigation"
    },
    {
      id: "new-post",
      label: "Create New Post",
      shortcut: "⌘ N",
      icon: Plus,
      action: () => {
        onOpenChange(false);
        // Trigger new post dialog
        document.dispatchEvent(new CustomEvent('open-new-post'));
      },
      category: "Actions"
    },
    {
      id: "strategic-planning",
      label: "Strategic Planning",
      shortcut: "⌘ S",
      icon: Target,
      action: () => router.push("/boardroom"),
      category: "Actions"
    },
    {
      id: "start-discussion",
      label: "Start Discussion",
      shortcut: "⌘ T",
      icon: MessageSquare,
      action: () => {
        onOpenChange(false);
        document.dispatchEvent(new CustomEvent('open-new-post', { detail: { type: 'discussion' } }));
      },
      category: "Actions"
    },
    {
      id: "schedule-briefing",
      label: "Schedule Briefing",
      shortcut: "⌘ Shift S",
      icon: Calendar,
      action: () => router.push("/briefings"),
      category: "Actions"
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(search.toLowerCase()) ||
    command.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onOpenChange(false);
      }
    }
  }, [filteredCommands, selectedIndex, onOpenChange]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="command-palette p-0 max-w-2xl">
        <div className="flex items-center border-b border-border/20 px-4">
          <Search className="h-4 w-4 text-mid mr-3" />
          <Input
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent focus:ring-0 text-foreground placeholder:text-mid/70"
            autoFocus
          />
          <div className="text-xs text-mid/60 ml-2">ESC</div>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
            <div key={category} className="mb-4">
              <div className="px-2 py-1 text-xs font-semibold text-gold uppercase tracking-wider">
                {category}
              </div>
              {categoryCommands.map((command, index) => {
                const globalIndex = filteredCommands.indexOf(command);
                const Icon = command.icon;
                return (
                  <div
                    key={command.id}
                    className={cn(
                      "command-item flex items-center justify-between px-3 py-2 text-sm cursor-pointer",
                      selectedIndex === globalIndex
                        ? "bg-gold/15 text-foreground"
                        : "text-mid hover:text-foreground"
                    )}
                    data-selected={selectedIndex === globalIndex}
                    onClick={() => {
                      command.action();
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{command.label}</span>
                    </div>
                    {command.shortcut && (
                      <div className="text-xs text-mid/60 bg-panel/50 px-2 py-1 font-mono">
                        {command.shortcut}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          
          {filteredCommands.length === 0 && (
            <div className="px-3 py-8 text-center text-mid">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{search}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}