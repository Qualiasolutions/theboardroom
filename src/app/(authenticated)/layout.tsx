import { AuthenticatedNavigation } from "@/components/layout/AuthenticatedNavigation";
import { Header } from "@/components/layout/header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation />
      <Header />
      <main className="lg:ml-64 pt-16">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}