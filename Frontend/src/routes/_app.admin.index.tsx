import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ShieldCheck, UserPlus, Users as UsersIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { listUsers } from "@/services/auth-api";
import type { AuthUser } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview · FaceGate" }] }),
  component: AdminOverview,
});

function AdminOverview() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    listUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  if (!user) return null;
  if (user.role !== "admin") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">
          Administrator role required.
        </p>
      </div>
    );
  }

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        Administration · Overview
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">System overview</h1>
      <p className="mt-2 text-muted-foreground">
        High-level view of FaceGate access state.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat icon={UsersIcon} label="Total users" value={users.length} tone="primary" />
        <Stat icon={ShieldCheck} label="Administrators" value={adminCount} tone="accent" />
        <Stat icon={UserPlus} label="Standard users" value={userCount} tone="muted" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-primary" />
            Authentication health
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <Row label="Face encoder" value="dlib · 128-D" ok />
            <Row label="Replay protection" value="Enabled" ok />
            <Row label="Rate limiting" value="5 attempts / window" ok />
            <Row label="Session backend" value="JWT / Flask session" ok />
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Access policy
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <Row label="Admin → all routes" value="GRANT" ok />
            <Row label="User → /dashboard/*" value="GRANT" ok />
            <Row label="User → /admin/*" value="DENY" />
            <Row label="Anonymous → protected" value="REDIRECT /login" />
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof UsersIcon;
  label: string;
  value: number;
  tone: "primary" | "accent" | "muted";
}) {
  const ring =
    tone === "primary"
      ? "ring-primary/30 bg-primary/10 text-primary"
      : tone === "accent"
        ? "ring-accent/30 bg-accent/10 text-accent"
        : "ring-border bg-secondary/50 text-muted-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`grid h-9 w-9 place-items-center rounded-lg ring-1 ${ring}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-mono text-3xl font-bold">{value}</p>
    </div>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <li className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-mono text-xs ${ok ? "text-success" : "text-destructive"}`}
      >
        {value}
      </span>
    </li>
  );
}
