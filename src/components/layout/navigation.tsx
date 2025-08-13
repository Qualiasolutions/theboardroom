"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Handshake, 
  FileText, 
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/rooms", label: "Rooms", icon: Users },
  { href: "/introductions", label: "Introductions", icon: Handshake },
  { href: "/briefings", label: "Briefings", icon: FileText },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-panel border-r border-border flex flex-col transform lg:translate-x-0 -translate-x-full transition-transform duration-300 z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="text-xl font-bold text-gold">BOARDROOM</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6">
        <div className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-background hover:text-foreground",
                  isActive ? "bg-background text-foreground border-l-2 border-gold" : "text-mid"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>
    </nav>
  );
}