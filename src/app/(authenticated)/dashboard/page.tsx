import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Activity } from "lucide-react";

export default function DashboardPage() {
  // Empty data arrays - ready for backend integration
  const rooms: any[] = [];
  const threads: any[] = [];
  const briefings: any[] = [];
  const members: any[] = [];

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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-mid">
              0 high signal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Total Threads</CardTitle>
            <MessageSquare className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-mid">
              0 with 5+ replies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Members</CardTitle>
            <Users className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-mid">
              0/10 slots filled
            </p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Briefings</CardTitle>
            <Calendar className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
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