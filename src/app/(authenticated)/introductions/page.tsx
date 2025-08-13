import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, UserPlus } from "lucide-react";

export default function IntroductionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategic Introductions</h1>
          <p className="text-mid mt-1">Request and manage connections within the founder community</p>
        </div>
        <Button className="bg-gold hover:bg-gold-soft text-background">
          <UserPlus className="h-4 w-4 mr-2" />
          Request Introduction
        </Button>
      </div>

      {/* Empty State */}
      <Card className="bg-panel border-border">
        <CardContent className="p-12 text-center">
          <Handshake className="h-16 w-16 mx-auto mb-6 text-mid opacity-50" />
          <CardTitle className="mb-2">No introduction requests</CardTitle>
          <CardDescription className="text-mid mb-6">
            Request strategic introductions to expand your founder network
          </CardDescription>
          <Button className="bg-gold hover:bg-gold-soft text-background">
            <UserPlus className="h-4 w-4 mr-2" />
            Make Your First Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}