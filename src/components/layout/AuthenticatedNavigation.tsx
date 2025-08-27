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
  Activity,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewPostDialog } from "@/components/ui/new-post-dialog";
import { useSupabase } from "@/lib/hooks/useSupabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/boardroom", label: "Boardroom", icon: Layout },
  { href: "/rooms", label: "Rooms", icon: Users },
  { href: "/introductions", label: "Introductions", icon: Handshake },
  { href: "/briefings", label: "Briefings", icon: FileText },
];

export function AuthenticatedNavigation() {
  const pathname = usePathname();
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const { useUser, useProfile, useSignOut } = useSupabase();
  
  const { data: user } = useUser();
  const { data: profile } = useProfile(user?.id);
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

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
          <div className="px-3 mb-6">
            <Button
              onClick={() => setShowNewPostDialog(true)}
              className="w-full bg-gradient-to-r from-gold to-gold-soft hover:from-gold-soft hover:to-gold text-background font-semibold transition-all duration-300 hover-lift shadow-premium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>

          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-300 hover-lift group",
                    isActive
                      ? "bg-gradient-to-r from-gold/20 to-gold/10 text-gold border-r-2 border-gold shadow-premium"
                      : "text-mid hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-gold" : "text-mid group-hover:text-foreground"
                  )} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-gold rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Activity Section */}
          <div className="px-3 mt-8">
            <div className="text-xs font-semibold text-mid/80 uppercase tracking-wider mb-3 px-3">
              Activity
            </div>
            <div className="space-y-1">
              <button className="flex items-center gap-3 px-3 py-2 text-sm text-mid hover:text-foreground hover:bg-foreground/5 w-full transition-colors group">
                <Bell className="h-4 w-4 group-hover:text-gold transition-colors" />
                <span>Notifications</span>
                <span className="ml-auto text-xs bg-gold/20 text-gold px-2 py-1 font-semibold">3</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 text-sm text-mid hover:text-foreground hover:bg-foreground/5 w-full transition-colors group">
                <Activity className="h-4 w-4 group-hover:text-gold transition-colors" />
                <span>Activity</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-border/20 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-3 w-full hover:bg-foreground/5 transition-colors group">
                <Avatar className="h-10 w-10 border-2 border-gold/20 group-hover:border-gold/40 transition-colors">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-gold/20 to-gold/10 text-gold font-semibold">
                    {profile?.full_name?.split(' ').map((n: string) => n[0]).join('') || user?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {profile?.full_name || 'Anonymous User'}
                  </div>
                  <div className="text-xs text-mid truncate">
                    {user?.email}
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.full_name || 'Anonymous User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} disabled={signOutMutation.isPending}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{signOutMutation.isPending ? 'Signing out...' : 'Sign out'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <NewPostDialog 
        open={showNewPostDialog} 
        onOpenChange={setShowNewPostDialog} 
      />
    </>
  );
}