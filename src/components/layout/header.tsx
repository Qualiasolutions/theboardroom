"use client";

import { Search, Bell, Menu, X, Command, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/ui/command-palette";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const unreadCount = 0; // No notifications without backend

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
    <header className="fixed top-0 right-0 lg:left-64 left-0 h-16 bg-background/95 backdrop-blur-xl border-b border-border/20 z-40 shadow-lg">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mid group-focus-within:text-gold transition-colors" />
            <Command className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-mid" />
            <Input
              type="search"
              placeholder="Search rooms, threads, members... ⌘K"
              className="pl-10 pr-8 bg-panel/50 border-border/30 focus:bg-panel focus:border-gold/50 transition-all duration-300 hover:bg-panel/70 placeholder:text-mid/70 cursor-pointer"
              onClick={() => setShowCommandPalette(true)}
              readOnly
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-gold/10 hover:text-gold transition-all duration-300 hover:scale-105"
          >
            <Zap className="h-4 w-4" />
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-gold/10 hover:text-gold transition-all duration-300 hover:scale-105"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-gold to-gold-soft text-background text-xs font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* User Avatar */}
          <div className="relative group">
            <Avatar className="h-9 w-9 border-2 border-border/30 group-hover:border-gold/50 transition-all duration-300 cursor-pointer ring-0 group-hover:ring-2 group-hover:ring-gold/20">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=A" />
              <AvatarFallback className="bg-gradient-to-br from-gold/20 to-gold/10 text-gold font-semibold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background group-hover:border-gold/30 transition-colors" />
          </div>
        </div>
      </div>
    </header>
    
    <CommandPalette 
      open={showCommandPalette} 
      onOpenChange={setShowCommandPalette} 
    />
    </>
  );
}