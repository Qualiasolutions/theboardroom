"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  Handshake, 
  FileText, 
  TrendingUp, 
  Globe, 
  Crown, 
  Check, 
  CreditCard,
  Lock,
  Building,
  Zap
} from "lucide-react";
import Link from "next/link";

const membershipPerks = [
  {
    icon: Crown,
    title: "10% Equity Ownership",
    description: "Equal partnership in Cyprus-based holding company with shared governance and decision-making rights."
  },
  {
    icon: Users,
    title: "Exclusive Network Access",
    description: "Connect with 9 other carefully vetted founders across diverse industries and markets."
  },
  {
    icon: Handshake,
    title: "Strategic Introductions",
    description: "Warm introductions to investors, partners, customers, and industry leaders through the network."
  },
  {
    icon: TrendingUp,
    title: "Investment Opportunities",
    description: "Access to exclusive deal flow and co-investment opportunities with fellow members."
  },
  {
    icon: FileText,
    title: "Private Briefings",
    description: "Weekly strategic sessions covering market insights, regulatory updates, and growth strategies."
  },
  {
    icon: Shield,
    title: "Privacy & Confidentiality",
    description: "End-to-end encrypted communications with strict confidentiality agreements."
  },
  {
    icon: Globe,
    title: "Cyprus Tax Benefits",
    description: "12.5% corporate tax rate, EU market access, and favorable dividend taxation structure."
  },
  {
    icon: Zap,
    title: "Fast-Track Decisions",
    description: "Rapid consensus building and execution on time-sensitive opportunities."
  }
];

const foundingMembers = [
  { name: "Abdelrahman", company: "TechVentures", location: "Dubai", avatar: "A" },
  { name: "Fawzi", company: "FinanceFlow", location: "London", avatar: "F" },
  { name: "Leila", company: "MarketReach", location: "Cairo", avatar: "L" },
  { name: "Sarah Chen", company: "DataSync", location: "Singapore", avatar: "S" },
  { name: "Marcus Johnson", company: "HealthTech", location: "Boston", avatar: "M" }
];

export default function MembershipPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    router.push('/membership/success');
  };

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

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Membership Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gold mb-4">Join the Boardroom</h1>
              <p className="text-xl text-foreground mb-2">
                Exclusive membership for visionary founders
              </p>
              <p className="text-lg text-mid">
                10 seats. 10% equity each. Strategic advantage for life.
              </p>
            </div>

            {/* Pricing */}
            <Card className="bg-panel border-border border-2 border-gold">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gold">Founding Member</CardTitle>
                    <CardDescription className="text-mid">
                      One-time membership fee + equity commitment
                    </CardDescription>
                  </div>
                  <Crown className="h-8 w-8 text-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">€50,000</span>
                    <span className="text-lg text-mid">one-time</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" />
                      <span className="text-sm text-foreground">10% equity ownership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" />
                      <span className="text-sm text-foreground">Lifetime membership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" />
                      <span className="text-sm text-foreground">Board voting rights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" />
                      <span className="text-sm text-foreground">Cyprus tax benefits</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Members */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Current Founding Members</h3>
              <div className="grid grid-cols-1 gap-3">
                {foundingMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-panel border border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gold text-background text-xs">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-mid">{member.company} • {member.location}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 bg-background border border-dashed border-gold">
                  <div className="h-8 w-8 bg-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">?</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gold">5 seats remaining</p>
                    <p className="text-xs text-mid">Be part of the founding team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form & Perks */}
          <div className="space-y-8">
            {/* Payment Form */}
            <Card className="bg-panel border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gold" />
                  Secure Payment
                </CardTitle>
                <CardDescription className="text-mid">
                  Complete your membership application
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePayment}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="founder@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payment Method</label>
                    <div className="p-3 bg-background border border-border">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-gold" />
                        <span className="text-sm font-medium">Bank Transfer (EUR)</span>
                      </div>
                      <p className="text-xs text-mid mt-1">
                        Secure bank transfer to Cyprus entity
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay €50,000 & Join
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-mid text-center">
                      Payment processed through secure banking partner
                    </p>
                  </div>
                </CardContent>
              </form>
            </Card>

            {/* Security Notice */}
            <Card className="bg-background border-border border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Secure & Confidential</p>
                    <p className="text-xs text-mid">
                      All payments are processed securely. Your information is protected by 
                      bank-grade encryption and strict confidentiality agreements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Membership Perks Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Membership Benefits</h2>
            <p className="text-lg text-mid">
              What you get as a founding member of Boardroom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipPerks.map((perk, i) => (
              <Card key={i} className="bg-panel border-border h-full">
                <CardContent className="p-6">
                  <perk.icon className="h-8 w-8 text-gold mb-4" />
                  <h3 className="font-semibold mb-2 text-foreground">{perk.title}</h3>
                  <p className="text-sm text-mid">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-panel border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Why Cyprus?</h3>
                <p className="text-sm text-mid">
                  Cyprus offers 12.5% corporate tax rate, EU market access, strong IP protection, 
                  and favorable dividend taxation for our holding structure.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-panel border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How is governance structured?</h3>
                <p className="text-sm text-mid">
                  Equal 10% ownership with rotating board chair (annual). Major decisions require 
                  60% consensus, operational decisions by simple majority.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-panel border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What&apos;s the vetting process?</h3>
                <p className="text-sm text-mid">
                  Invitation-only through existing members. Background verification, 
                  portfolio review, and consensus approval by current board.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-panel border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I exit my membership?</h3>
                <p className="text-sm text-mid">
                  Yes, members can transfer their equity to approved buyers or sell 
                  back to the company at fair market valuation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-mid">
            © 2024 Boardroom Holdings (Cyprus) Ltd. • 
            <Link href="/legal" className="text-gold hover:underline ml-1">Legal Terms</Link> • 
            <Link href="/privacy" className="text-gold hover:underline ml-1">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}