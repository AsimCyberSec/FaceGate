import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ScanFace, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Session ended securely");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <span className="text-base">
            FaceGate<span className="text-primary">.</span>
          </span>
          <span className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            v1.0
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/team">Team</Link>
          </Button>
          {!isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/register">Register</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/login">
                  <ScanFace className="mr-1.5 h-4 w-4" />
                  Login with Face
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
                  Dashboard
                </Link>
              </Button>
              <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                <span className="font-mono uppercase tracking-wide text-muted-foreground">
                  {user?.role}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1.5 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
