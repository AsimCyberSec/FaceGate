import { Link } from "@tanstack/react-router";
import { ShieldCheck, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              FaceGate
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Face Recognition-Based Passwordless Authentication System with
              Role-Based Access Control.
            </p>
          </div>

          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Users className="h-4 w-4" />
            Meet the team
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FaceGate · Academic Project</p>
        </div>
      </div>
    </footer>
  );
}
