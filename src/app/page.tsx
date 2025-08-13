"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Shield, Users } from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would validate invite codes
    if (inviteCode === "FOUNDERS2024" || inviteCode === "DEMO") {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gold mb-4">BOARDROOM</h1>
            <p className="text-xl text-foreground mb-2">
              Invitation-only boardroom for founders.
            </p>
            <p className="text-lg text-mid">
              Privacy-first. High-signal. Move faster together.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-left">
              <Shield className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-mid">
                End-to-end encrypted conversations. Your data never leaves our secure infrastructure.
              </p>
            </div>
            <div className="text-left">
              <Users className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-semibold mb-2">Curated Network</h3>
              <p className="text-sm text-mid">
                10 founding members. Each with 10% equity. Strategic introductions only.
              </p>
            </div>
            <div className="text-left">
              <Lock className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-semibold mb-2">Invitation Only</h3>
              <p className="text-sm text-mid">
                Access by invitation from existing members. Quality over quantity.
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="max-w-md mx-auto bg-panel border-border">
            <CardHeader>
              <CardTitle>Member Access</CardTitle>
              <CardDescription className="text-mid">
                Enter your invitation code to access the boardroom
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mid" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="founder@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="inviteCode" className="text-sm font-medium">
                    Invitation Code
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mid" />
                    <Input
                      id="inviteCode"
                      type="password"
                      placeholder="Enter your invite code"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Access Boardroom
                </Button>
                <div className="flex gap-2">
                  <Link href="/membership" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Join as Member
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-mid text-center">
                  For demo access, use code: <span className="font-mono text-gold">DEMO</span>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-mid">
          <p>© 2024 Boardroom. Cyprus-based entity. 10% equity per founding member.</p>
        </div>
      </footer>
    </div>
  );
}
