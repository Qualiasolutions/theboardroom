import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-gold" />
            <span className="text-xl font-bold text-gold">BOARDROOM</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-mid">
            Your privacy is our priority. Learn how we protect and handle your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gold" />
                End-to-End Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-mid">
                All communications are encrypted using industry-standard protocols. Only you and intended recipients can access your messages.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gold" />
                Zero-Knowledge Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-mid">
                We cannot access your private content. Your encryption keys are generated and stored locally on your device.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-gold" />
                No Third-Party Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-mid">
                We don't use analytics, tracking pixels, or third-party services that could compromise your privacy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-gold" />
                Minimal Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-mid">
                We collect only essential data required for platform functionality. No behavioral tracking or profiling.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Data We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Information</h4>
                <p className="text-sm text-mid">Email address and encrypted profile data required for membership verification.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communication Metadata</h4>
                <p className="text-sm text-mid">Timestamps and participant lists (but not message content) for technical functionality.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Data</h4>
                <p className="text-sm text-mid">Device and connection information necessary for security and platform optimization.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Data Access</h4>
                <p className="text-sm text-mid">Request a copy of all data we store about you at any time.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Deletion</h4>
                <p className="text-sm text-mid">Permanently delete your account and all associated data with immediate effect.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Portability</h4>
                <p className="text-sm text-mid">Export your data in standard formats for use with other services.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-mid mb-4">
                Questions about privacy? Our data protection team is here to help.
              </p>
              <p className="text-sm">
                <strong>Email:</strong> <span className="text-gold">privacy@boardroom.cy</span><br />
                <strong>Address:</strong> Boardroom Holdings (Cyprus) Ltd, Nicosia, Cyprus
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-mid">
            © 2024 Boardroom Holdings (Cyprus) Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}