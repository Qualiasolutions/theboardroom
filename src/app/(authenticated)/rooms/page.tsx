import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Activity, Plus } from "lucide-react";
import Link from "next/link";
import rooms from "@/data/rooms.json";
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

// Get member info by ID
function getMember(id: string) {
  return members.find(m => m.id === id);
}

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rooms</h1>
          <p className="text-mid mt-1">Strategic discussions and focused collaboration</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Room
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`}>
            <Card className="bg-panel border-border hover:border-gold transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription className="text-mid mt-2 text-sm">
                      {room.charter}
                    </CardDescription>
                  </div>
                  <span className={`text-xs px-2 py-1 ${getSignalColor(room.signal)}`}>
                    {room.signal}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-mid mb-4">{room.description}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-mid" />
                    <span className="text-sm text-mid">{room.threadCount} threads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-mid" />
                    <span className="text-sm text-mid">
                      {new Date(room.lastActivity).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Members */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {room.members.slice(0, 4).map((memberId) => {
                      const member = getMember(memberId);
                      if (!member) return null;
                      return (
                        <Avatar key={memberId} className="h-6 w-6 border border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs bg-panel">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      );
                    })}
                  </div>
                  {room.members.length > 4 && (
                    <span className="text-xs text-mid">
                      +{room.members.length - 4} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Room Creation Prompt */}
      <Card className="bg-panel border-border border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="bg-background p-4 mb-4">
            <Plus className="h-8 w-8 text-gold" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create a New Room</h3>
          <p className="text-sm text-mid text-center max-w-md mb-4">
            Start a focused discussion space for strategic topics that need dedicated attention from specific members.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}