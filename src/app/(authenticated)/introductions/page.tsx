import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Handshake, Check, X, Clock, UserPlus, ArrowRight } from "lucide-react";
import introductions from "@/data/introductions.json";
import members from "@/data/members.json";

// Get member info by ID
function getMember(id: string) {
  return members.find(m => m.id === id);
}

// Get status badge
function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gold/20 text-gold">
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    case "approved":
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500/20 text-green-500">
          <Check className="h-3 w-3" />
          Approved
        </span>
      );
    case "declined":
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-red-500/20 text-red-500">
          <X className="h-3 w-3" />
          Declined
        </span>
      );
    default:
      return null;
  }
}

export default function IntroductionsPage() {
  const pendingIntros = introductions.filter(i => i.status === "pending");
  const approvedIntros = introductions.filter(i => i.status === "approved");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Introductions</h1>
          <p className="text-mid mt-1">Strategic connections within the network</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Request Introduction
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Pending</CardTitle>
            <Clock className="h-4 w-4 text-mid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingIntros.length}</div>
            <p className="text-xs text-mid">awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Approved</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedIntros.length}</div>
            <p className="text-xs text-mid">this month</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mid">Success Rate</CardTitle>
            <Handshake className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-mid">conversion to meetings</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Introductions */}
      {pendingIntros.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Introductions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingIntros.map((intro) => {
              const requester = getMember(intro.requester);
              const mutual = getMember(intro.mutual);
              
              return (
                <Card key={intro.id} className="bg-panel border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {intro.target}
                          <ArrowRight className="h-4 w-4 text-mid" />
                        </CardTitle>
                        <CardDescription className="text-mid">
                          {intro.targetRole}
                        </CardDescription>
                      </div>
                      {getStatusBadge(intro.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-4">{intro.context}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={requester?.avatar} />
                          <AvatarFallback className="text-xs bg-panel">
                            {requester?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-mid">
                          Requested by {intro.requesterName}
                        </span>
                      </div>
                      
                      {mutual && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={mutual.avatar} />
                            <AvatarFallback className="text-xs bg-panel">
                              {mutual.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-mid">
                            Mutual: {mutual.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Approved Introductions */}
      {approvedIntros.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Approvals</h2>
          <div className="space-y-3">
            {approvedIntros.map((intro) => {
              const requester = getMember(intro.requester);
              
              return (
                <Card key={intro.id} className="bg-panel border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={requester?.avatar} />
                          <AvatarFallback className="text-xs bg-panel">
                            {requester?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {intro.requesterName} → {intro.target}
                          </p>
                          <p className="text-sm text-mid">{intro.targetRole}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(intro.status)}
                        <Button size="sm" variant="outline">
                          View Details
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