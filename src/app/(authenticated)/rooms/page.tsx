import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategic Rooms</h1>
          <p className="text-mid mt-1">Focused discussion spaces for high-signal conversations</p>
        </div>
        <Button className="bg-gold hover:bg-gold-soft text-background">
          <Plus className="h-4 w-4 mr-2" />
          Create Room
        </Button>
      </div>

      {/* Empty State */}
      <Card className="bg-panel border-border">
        <CardContent className="p-12 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
          <CardTitle className="mb-2">No rooms yet</CardTitle>
          <CardDescription className="text-mid mb-6">
            Create your first strategic discussion room to start collaborating with founders
          </CardDescription>
          <Button className="bg-gold hover:bg-gold-soft text-background">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}