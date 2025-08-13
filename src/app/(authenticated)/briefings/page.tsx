import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Video, CheckCircle, Plus } from "lucide-react";
import briefings from "@/data/briefings.json";
import members from "@/data/members.json";

// Get member info by ID
function getMember(id: string) {
  return members.find(m => m.id === id);
}

export default function BriefingsPage() {
  const upcomingBriefings = briefings.filter(b => b.status === "upcoming");
  const completedBriefings = briefings.filter(b => b.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Briefings</h1>
          <p className="text-mid mt-1">Structured sessions for strategic alignment</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Briefing
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBriefings.length}</div>
            <p className="text-xs text-mid">this month</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBriefings.length}</div>
            <p className="text-xs text-mid">last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Avg Attendance</CardTitle>
            <Users className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5</div>
            <p className="text-xs text-mid">members per briefing</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Next Briefing</CardTitle>
            <Clock className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2d</div>
            <p className="text-xs text-mid">until next session</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Briefings */}
      {upcomingBriefings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Briefings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBriefings.map((briefing) => {
              const host = getMember(briefing.host);
              const attendeesList = briefing.attendees
                .map(id => getMember(id))
                .filter(Boolean);
              
              return (
                <Card key={briefing.id} className="bg-panel border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{briefing.title}</CardTitle>
                        <CardDescription className="text-mid mt-1">
                          {briefing.tldr}
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        RSVP
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Date and Time */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-mid" />
                          <span className="text-sm text-mid">{briefing.displayDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-mid" />
                          <span className="text-sm text-mid">{briefing.time}</span>
                        </div>
                      </div>

                      {/* Host */}
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={host?.avatar} />
                          <AvatarFallback className="text-xs bg-panel">
                            {host?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-mid">
                          Host: {briefing.hostName}
                        </span>
                      </div>

                      {/* Agenda */}
                      {briefing.agenda && briefing.agenda.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gold mb-2">Agenda:</p>
                          <ul className="space-y-1">
                            {briefing.agenda.map((item, i) => (
                              <li key={i} className="text-xs text-mid flex items-start">
                                <span className="text-gold mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Attendees */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {attendeesList.slice(0, 3).map((attendee) => (
                              <Avatar key={attendee?.id} className="h-6 w-6 border border-background">
                                <AvatarImage src={attendee?.avatar} />
                                <AvatarFallback className="text-xs bg-panel">
                                  {attendee?.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-mid">
                            {briefing.rsvpCount} attending
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Briefings */}
      {completedBriefings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Briefings</h2>
          <div className="space-y-3">
            {completedBriefings.map((briefing) => {
              const host = getMember(briefing.host);
              
              return (
                <Card key={briefing.id} className="bg-panel border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={host?.avatar} />
                          <AvatarFallback className="text-xs bg-panel">
                            {host?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{briefing.title}</p>
                          <p className="text-sm text-mid">
                            {briefing.displayDate} • {briefing.rsvpCount} attended
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500">
                          Completed
                        </span>
                        <Button size="sm" variant="outline">
                          View Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}