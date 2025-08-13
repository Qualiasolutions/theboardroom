"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, FileText, Plus } from "lucide-react";
import { useParams } from "next/navigation";

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Room #{roomId}</h1>
          <p className="text-mid mt-1">Strategic discussion space</p>
        </div>
        <Button className="bg-gold hover:bg-gold-soft text-background">
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Button>
      </div>

      {/* Room Tabs */}
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-panel">
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="briefings">Briefings</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="threads" className="space-y-4">
          <Card className="bg-panel border-border">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No threads yet</h3>
              <p className="text-mid mb-6">Start the first discussion in this room</p>
              <Button className="bg-gold hover:bg-gold-soft text-background">
                <Plus className="h-4 w-4 mr-2" />
                Start First Thread
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-panel border-border">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
              <p className="text-mid">Real-time chat will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="briefings" className="space-y-4">
          <Card className="bg-panel border-border">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No briefings scheduled</h3>
              <p className="text-mid">Room-specific briefings will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="bg-panel border-border">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No members yet</h3>
              <p className="text-mid">Invite founders to join this room</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}