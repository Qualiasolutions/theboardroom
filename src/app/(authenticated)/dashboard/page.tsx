"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Activity, TrendingUp, Target, Zap, BarChart3, ArrowUp, ArrowDown, Clock, Award } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { boards, posts, currentBoard } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Calculate dynamic metrics from actual data (only when mounted)
  const totalBoards = mounted ? boards.length : 0;
  const totalPosts = mounted ? posts.length : 0;
  const totalBoardItems = mounted ? boards.reduce((sum, board) => sum + board.items.length, 0) : 0;
  const completedItems = mounted ? boards.reduce((sum, board) => 
    sum + board.items.filter(item => item.status === 'completed').length, 0
  ) : 0;
  const completionRate = totalBoardItems > 0 ? Math.round((completedItems / totalBoardItems) * 100) : 0;
  
  // Mock some growth metrics for executive dashboard
  const weeklyGrowth = 12;
  const activeMembers = 5;

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="glass p-6 bg-gradient-to-r from-gold/5 to-transparent border border-gold/10 loading-skeleton h-32" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass shadow-premium hover-lift border border-gold/10 loading-skeleton h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Executive Welcome Section */}
      <div className="glass p-6 bg-gradient-to-r from-gold/5 to-transparent border border-gold/10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-soft flex items-center justify-center">
            <Award className="h-6 w-6 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
              Welcome back, Abdelrahman
            </h1>
            <p className="text-mid/80 font-medium">Strategic Command Center • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-mid">All systems operational</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" />
            <span className="text-mid">Last activity: 2 minutes ago</span>
          </div>
        </div>
      </div>

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="executive-card shadow-premium card-float border border-gold/10 group stagger-item">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-mid group-hover:text-foreground transition-colors">Strategic Boards</CardTitle>
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 micro-bounce">
              <Target className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-luxury mb-1">{totalBoards}</div>
            <p className="text-xs text-mid flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-500 animate-bounce" />
              {weeklyGrowth}% this week
            </p>
          </CardContent>
        </Card>

        <Card className="executive-card shadow-premium card-float border border-gold/10 group stagger-item">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-mid group-hover:text-foreground transition-colors">Strategic Posts</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/10 micro-bounce">
              <MessageSquare className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-luxury mb-1">{totalPosts}</div>
            <p className="text-xs text-mid">
              High-signal discussions
            </p>
          </CardContent>
        </Card>

        <Card className="executive-card shadow-premium card-float border border-gold/10 group stagger-item">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-mid group-hover:text-foreground transition-colors">Active Members</CardTitle>
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/10 micro-bounce">
              <Users className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-luxury mb-1">{activeMembers}</div>
            <p className="text-xs text-mid">
              {activeMembers}/10 founding members
            </p>
          </CardContent>
        </Card>

        <Card className="executive-card shadow-premium card-float border border-gold/10 group stagger-item">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-mid group-hover:text-foreground transition-colors">Completion Rate</CardTitle>
            <div className="p-2 bg-gradient-to-br from-gold/30 to-gold-soft/20 micro-bounce">
              <TrendingUp className="h-4 w-4 text-gold" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-luxury mb-1">{completionRate}%</div>
            <p className="text-xs text-mid flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full animate-pulse ${
                completionRate > 75 ? 'bg-green-500' : 
                completionRate > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              {completedItems}/{totalBoardItems} objectives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Threads */}
        <div className="lg:col-span-2">
          <Card className="bg-panel border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Most Active Threads</CardTitle>
                  <CardDescription className="text-mid">Recent high-signal discussions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 text-center text-mid">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No threads yet</p>
                <p className="text-sm mt-1">Start a discussion to see activity here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Rooms */}
          <Card className="bg-panel border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Rooms</CardTitle>
                <Activity className="h-4 w-4 text-gold" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="py-4 text-center text-mid">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active rooms</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Briefings */}
          <Card className="bg-panel border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Briefings</CardTitle>
                <Calendar className="h-4 w-4 text-gold" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="py-4 text-center text-mid">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming briefings</p>
              </div>
            </CardContent>
          </Card>

          {/* Executive Quick Actions */}
          <Card className="glass shadow-premium border border-gold/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-gold" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/boardroom">
                <Button className="w-full justify-start btn-luxury text-background font-semibold shadow-lg group">
                  <Target className="h-4 w-4 mr-3 transition-colors" />
                  Strategic Planning
                </Button>
              </Link>
              <Button className="w-full justify-start micro-bounce border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 group" variant="outline">
                <MessageSquare className="h-4 w-4 mr-3 group-hover:text-blue-400 transition-colors" />
                Start Discussion
              </Button>
              <Button className="w-full justify-start micro-bounce border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 group" variant="outline">
                <Calendar className="h-4 w-4 mr-3 group-hover:text-purple-400 transition-colors" />
                Schedule Briefing
              </Button>
              <Button className="w-full justify-start micro-bounce border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10 transition-all duration-300 group" variant="outline">
                <Users className="h-4 w-4 mr-3 group-hover:text-green-400 transition-colors" />
                Member Connect
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}