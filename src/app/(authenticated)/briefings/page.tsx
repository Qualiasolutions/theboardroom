import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export default function BriefingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategic Briefings</h1>
          <p className="text-mid mt-1">Schedule and manage strategic sessions with fellow founders</p>
        </div>
        <Button className="bg-gold hover:bg-gold-soft text-background">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Briefing
        </Button>
      </div>

      {/* Empty State */}
      <Card className="bg-panel border-border">
        <CardContent className="p-12 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
          <CardTitle className="mb-2">No briefings scheduled</CardTitle>
          <CardDescription className="text-mid mb-6">
            Schedule your first strategic briefing to coordinate with the community
          </CardDescription>
          <Button className="bg-gold hover:bg-gold-soft text-background">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Your First Briefing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}