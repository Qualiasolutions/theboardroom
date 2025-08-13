import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, Calendar, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import rooms from "@/data/rooms.json";
import threads from "@/data/threads.json";
import briefings from "@/data/briefings.json";
import members from "@/data/members.json";

// Get signal badge color
function getSignalColor(signal: string) {
  switch (signal) {
    case "high":
      return "bg-gold text-background";
    case "medium":
      return "bg-gold-soft text-background";
    case "low":
      return "bg-mid text-foreground";
    default:
      return "bg-mid text-foreground";
  }
}

export default function DashboardPage() {
  // Get most active threads
  const activeThreads = threads.slice(0, 3);
  const upcomingBriefings = briefings.filter(b => b.status === "upcoming").slice(0, 2);
  const activeRooms = rooms.sort((a, b) => b.threadCount - a.threadCount).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Abdelrahman</h1>
        <p className="text-mid mt-1">Here&apos;s what&apos;s happening in your boardroom</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Active Rooms</CardTitle>
            <Users className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
            <p className="text-xs text-mid">
              {rooms.filter(r => r.signal === "high").length} high signal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Total Threads</CardTitle>
            <MessageSquare className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threads.length}</div>
            <p className="text-xs text-mid">
              {threads.filter(t => t.replies > 5).length} with 5+ replies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Members</CardTitle>
            <Users className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-mid">
              {members.length}/10 slots filled
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Briefings</CardTitle>
            <Calendar className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBriefings.length}</div>
            <p className="text-xs text-mid">
              upcoming this week
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
                <Link href="/rooms">
                  <Button variant="ghost" size="sm">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeThreads.map((thread) => (
                <Link 
                  key={thread.id} 
                  href={`/rooms/${thread.roomId}/${thread.id}`}
                  className="block"
                >
                  <div className="p-4 bg-background border border-border hover:border-gold transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground hover:text-gold transition-colors">
                          {thread.title}
                        </h3>
                        <p className="text-sm text-mid mt-1">{thread.summary}</p>
                      </div>
                      <span className="text-xs text-mid ml-4">{thread.time}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs bg-panel">
                            {thread.authorName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-mid">{thread.authorName}</span>
                      </div>
                      <span className="text-xs text-mid">
                        {thread.replies} replies
                      </span>
                      {thread.tags && (
                        <div className="flex gap-1">
                          {thread.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs px-2 py-1 bg-panel text-mid"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
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
              {activeRooms.map((room) => (
                <Link 
                  key={room.id} 
                  href={`/rooms/${room.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between py-2 hover:text-gold transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{room.name}</p>
                      <p className="text-xs text-mid">{room.threadCount} threads</p>
                    </div>
                    <span className={`text-xs px-2 py-1 ${getSignalColor(room.signal)}`}>
                      {room.signal}
                    </span>
                  </div>
                </Link>
              ))}
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
              {upcomingBriefings.map((briefing) => (
                <Link 
                  key={briefing.id} 
                  href={`/briefings/${briefing.id}`}
                  className="block"
                >
                  <div className="py-2 hover:text-gold transition-colors">
                    <p className="font-medium text-sm">{briefing.title}</p>
                    <p className="text-xs text-mid mt-1">{briefing.displayDate} • {briefing.time}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs bg-panel">
                          {briefing.hostName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-mid">
                        {briefing.rsvpCount} attending
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start a Thread
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Briefing
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Request Introduction
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}