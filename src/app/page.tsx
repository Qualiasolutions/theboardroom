import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap } from "lucide-react";

export default async function LandingPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/dashboard')
  }

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
              <Zap className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-sm text-mid">
                Strategic planning with live collaboration tools. Move fast, make decisions.
              </p>
            </div>
          </div>

          {/* Access Card */}
          <div className="max-w-md mx-auto text-center">
            <div className="bg-panel border border-border p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">Member Access</h2>
              <p className="text-mid mb-6">
                Access to Boardroom is by invitation only. Sign in with your member credentials.
              </p>
              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-background font-semibold">
                  Member Sign In
                </Button>
              </Link>
            </div>
            <p className="text-sm text-mid">
              Need access? Contact your organization administrator.
            </p>
          </div>
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
