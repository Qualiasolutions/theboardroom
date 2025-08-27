"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Handshake, 
  FileText, 
  Layout,
  Plus,
  Settings,
  Bell,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NewPostDialog } from "@/components/ui/new-post-dialog";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/boardroom", label: "Boardroom", icon: Layout },
  { href: "/rooms", label: "Rooms", icon: Users },
  { href: "/introductions", label: "Introductions", icon: Handshake },
  { href: "/briefings", label: "Briefings", icon: FileText },
];

export function Navigation() {
  const pathname = usePathname();
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-64 bg-panel/95 backdrop-blur-xl border-r border-border/20 flex flex-col transform lg:translate-x-0 -translate-x-full transition-all duration-500 ease-out z-50 shadow-2xl">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/10 bg-gradient-to-r from-gold/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-soft flex items-center justify-center font-bold text-background text-sm">
              B
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gold to-gold-soft bg-clip-text text-transparent">
              BOARDROOM
            </h1>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          <div className="space-y-2 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                    "hover:bg-gradient-to-r hover:from-gold/10 hover:to-transparent hover:text-foreground hover:translate-x-1",
                    isActive 
                      ? "bg-gradient-to-r from-gold/15 to-gold/5 text-foreground shadow-lg" 
                      : "text-mid hover:shadow-md"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-gold-soft" />
                  )}
                  <Icon className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isActive ? "text-gold" : "group-hover:text-gold group-hover:scale-110"
                  )} />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-gold rounded-full opacity-60" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4 py-3 border-t border-border/10">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gold/5 to-transparent hover:from-gold/10 transition-all duration-300 cursor-pointer group">
            <Avatar className="h-10 w-10 border-2 border-gold/20 group-hover:border-gold/40 transition-colors">
              <AvatarFallback className="bg-gradient-to-br from-gold/20 to-gold/10 text-gold font-semibold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Abdelrahman</p>
              <p className="text-xs text-mid truncate">Founder • Active</p>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-4 space-y-3">
          <Button 
            className="w-full btn-luxury text-background font-semibold shadow-lg" 
            size="sm"
            onClick={() => setShowNewPostDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 hover:bg-gold/10 hover:text-gold transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 hover:bg-gold/10 hover:text-gold transition-all duration-300"
            >
              <Activity className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 hover:bg-gold/10 hover:text-gold transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* New Post Dialog */}
      <NewPostDialog 
        open={showNewPostDialog} 
        onOpenChange={setShowNewPostDialog} 
      />
    </>
  );
}