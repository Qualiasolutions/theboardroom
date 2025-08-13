import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="text-gold tracking-[0.2em] uppercase">Boardroom</div>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Invitation-only boardroom for founders. Privacy-first.</h1>
        <p className="mt-3 text-mid">A high-signal community for strategic clarity, warm introductions, and speed.</p>
        <div className="h-px bg-border my-8" />
        <div className="mx-auto max-w-md text-left border border-border bg-panel p-4">
          <div className="text-sm mb-2">Login</div>
          <input placeholder="Email (magic link placeholder)" className="w-full h-11 bg-background border border-border px-3 mb-3 placeholder:text-mid" />
          <Button className="w-full">Continue</Button>
        </div>
        <div className="mt-6 text-sm text-mid">Demo access → <Link className="text-gold" href="/dashboard">Enter</Link></div>
      </div>
    </div>
  );
}
