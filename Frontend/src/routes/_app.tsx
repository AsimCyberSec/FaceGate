import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, loading } = useAuth();
  const [redirected, setRedirected] = useState(false);

  // Client-side guard (storage isn't available during SSR/route resolution).
  useEffect(() => {
    if (!loading && !user && !redirected) {
      setRedirected(true);
      window.location.replace("/login");
    }
  }, [loading, user, redirected]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          Verifying secure session…
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role={user.role} />
        <main className="flex-1 bg-background/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Note: auth state lives in localStorage (not router context), so the guard is
// implemented at the component level above. Swap to a context-based beforeLoad
// guard when wiring real Flask sessions.
