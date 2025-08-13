"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, FileText, Send, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import rooms from "@/data/rooms.json";
import threads from "@/data/threads.json";
import members from "@/data/members.json";
import briefings from "@/data/briefings.json";

// Get member info by ID
function getMember(id: string) {
  return members.find(m => m.id === id);
}

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

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  
  const room = rooms.find(r => r.id === roomId);
  const roomThreads = threads.filter(t => t.roomId === roomId);
  const roomMembers = room?.members.map(id => getMember(id)).filter(Boolean) || [];
  const roomBriefings = briefings.filter(b => 
    b.host && room?.members.includes(b.host)
  );

  if (!room) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-mid">Room not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{room.name}</h1>
            <span className={`text-xs px-2 py-1 ${getSignalColor(room.signal)}`}>
              {room.signal} signal
            </span>
          </div>
          <p className="text-mid">{room.charter}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="bg-panel border border-border">
          <TabsTrigger value="threads">
            <MessageSquare className="h-4 w-4 mr-2" />
            Threads
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="briefings">
            <FileText className="h-4 w-4 mr-2" />
            Briefings
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Members
          </TabsTrigger>
        </TabsList>

        {/* Threads Tab */}
        <TabsContent value="threads" className="space-y-4">
          {roomThreads.map((thread) => (
            <Link 
              key={thread.id} 
              href={`/rooms/${roomId}/${thread.id}`}
              className="block"
            >
              <Card className="bg-panel border-border hover:border-gold transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground hover:text-gold transition-colors">
                        {thread.title}
                      </h3>
                      <p className="text-sm text-mid mt-2">{thread.summary}</p>
                    </div>
                    <span className="text-xs text-mid ml-4">{thread.time}</span>
                  </div>
                  
                  {thread.content && (
                    <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
                      {thread.content}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-panel">
                          {thread.authorName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-mid">{thread.authorName}</span>
                    </div>
                    <span className="text-sm text-mid">
                      {thread.replies} replies
                    </span>
                    {thread.tags && (
                      <div className="flex gap-1">
                        {thread.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-background text-mid"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-panel border-border">
            <CardContent className="p-6">
              <div className="h-96 flex items-center justify-center text-mid">
                <p>Real-time chat coming soon</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                  disabled
                />
                <Button disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Briefings Tab */}
        <TabsContent value="briefings" className="space-y-4">
          {roomBriefings.length > 0 ? (
            roomBriefings.map((briefing) => (
              <Card key={briefing.id} className="bg-panel border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{briefing.title}</h3>
                      <p className="text-sm text-mid mt-1">{briefing.tldr}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-mid">
                          {briefing.displayDate} • {briefing.time}
                        </span>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs bg-panel">
                              {briefing.hostName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-mid">
                            Host: {briefing.hostName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">RSVP</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-panel border-border">
              <CardContent className="p-12 text-center">
                <p className="text-mid">No briefings scheduled for this room</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomMembers.map((member) => (
              <Card key={member?.id} className="bg-panel border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member?.avatar} />
                      <AvatarFallback className="bg-panel text-gold">
                        {member?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member?.name}</h3>
                      <p className="text-sm text-mid">{member?.role}</p>
                      <p className="text-sm text-mid">{member?.company}</p>
                      <p className="text-xs text-mid mt-1">{member?.location}</p>
                      
                      <div className="mt-3 space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gold mb-1">Offers:</p>
                          <div className="flex flex-wrap gap-1">
                            {member?.offers.map((offer, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-background text-mid">
                                {offer}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gold mb-1">Needs:</p>
                          <div className="flex flex-wrap gap-1">
                            {member?.needs.map((need, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-background text-mid">
                                {need}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}