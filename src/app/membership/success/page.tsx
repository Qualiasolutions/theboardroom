import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Mail, Calendar, Building } from "lucide-react";
import Link from "next/link";

export default function MembershipSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-gold" />
            <span className="text-xl font-bold text-gold">BOARDROOM</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-gold/20 p-6 w-fit">
              <CheckCircle className="h-16 w-16 text-gold" />
            </div>
          </div>

          {/* Welcome Message */}
          <div>
            <h1 className="text-4xl font-bold text-gold mb-4">Welcome to Boardroom</h1>
            <p className="text-xl text-foreground mb-2">
              Payment successful! You&apos;re now a founding member.
            </p>
            <p className="text-lg text-mid">
              You own 10% equity and have full voting rights.
            </p>
          </div>

          {/* Next Steps Card */}
          <Card className="bg-panel border-border text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-gold" />
                Next Steps
              </CardTitle>
              <CardDescription className="text-mid">
                Complete your onboarding to access all member benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Check Your Email</p>
                  <p className="text-xs text-mid">
                    Onboarding instructions and legal documents sent to your email
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gold mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Schedule Onboarding Call</p>
                  <p className="text-xs text-mid">
                    30-minute call with existing members within 48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gold mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Legal Documentation</p>
                  <p className="text-xs text-mid">
                    Cyprus entity setup and shareholder agreements (7-14 days)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full h-12 text-base">
                Access Your Boardroom
              </Button>
            </Link>
            <p className="text-xs text-mid">
              Full access granted immediately. Use invite code: <span className="font-mono text-gold">FOUNDER2024</span>
            </p>
          </div>

          {/* Contact Info */}
          <Card className="bg-background border-border border-dashed">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-2">Need Help?</p>
              <p className="text-xs text-mid">
                Contact us at <span className="text-gold">onboarding@boardroom.cy</span> or 
                reach out to any existing member directly through the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}