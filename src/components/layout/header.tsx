"use client";

import { Search, Bell, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import notifications from "@/data/notifications.json";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 right-0 lg:left-64 left-0 h-16 bg-background border-b border-border z-40">
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mid" />
            <Input
              type="search"
              placeholder="Search rooms, threads, members..."
              className="pl-10 bg-panel border-border"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gold text-background text-xs font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* User Avatar */}
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=A" />
            <AvatarFallback className="bg-panel text-gold">A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}