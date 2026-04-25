import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ScanFace, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard · FaceGate" }] }),
  component: UserDashboard,
});

function UserDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 p-8 shadow-glow">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Hello, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          You're signed in via biometric authentication. Your session is encrypted
          and bound to your face encoding.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Pill icon={ShieldCheck} label="Session secure" tone="success" />
          <Pill icon={ScanFace} label="Face verified" tone="primary" />
          <Pill icon={User} label={`Role: ${user.role}`} tone="muted" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/dashboard/profile"
          className="group rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/50 hover:shadow-glow"
        >
          <User className="h-5 w-5 text-primary" />
          <h3 className="mt-3 font-semibold">Your profile</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your enrolled identity details.
          </p>
        </Link>
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <Activity className="h-5 w-5 text-accent" />
          <h3 className="mt-3 font-semibold">Recent activity</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <ActivityRow label="Login successful" time="just now" ok />
            <ActivityRow label="Session created" time="just now" ok />
            <ActivityRow
              label="Account enrolled"
              time={new Date(user.createdAt).toLocaleDateString()}
              ok
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof ShieldCheck;
  label: string;
  tone: "success" | "primary" | "muted";
}) {
  const styles =
    tone === "success"
      ? "border-success/40 bg-success/10 text-success"
      : tone === "primary"
        ? "border-primary/40 bg-primary/10 text-primary"
        : "border-border bg-secondary/50 text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function ActivityRow({ label, time, ok }: { label: string; time: string; ok?: boolean }) {
  return (
    <li className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <span className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-success" : "bg-destructive"}`} />
        {label}
      </span>
      <span className="font-mono text-xs text-muted-foreground">{time}</span>
    </li>
  );
}
