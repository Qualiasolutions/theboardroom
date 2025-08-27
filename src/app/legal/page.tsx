import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft } from "lucide-react";

export default function LegalPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Legal Terms</h1>
          <p className="text-lg text-mid">
            Terms and conditions for Boardroom membership and platform usage.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-mid">
                By accessing the Boardroom platform, you agree to be bound by these terms of service and all applicable laws and regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Membership Agreement</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-mid">
                Membership in Boardroom constitutes a binding agreement for equity participation in our Cyprus-based holding company.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-mid">
                We are committed to protecting your privacy. All communications are end-to-end encrypted and stored securely.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-panel border-border">
            <CardHeader>
              <CardTitle>Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-mid">
                All members agree to maintain strict confidentiality regarding discussions, strategies, and member information shared within the platform.
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