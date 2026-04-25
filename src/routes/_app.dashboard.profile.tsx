import { createFileRoute } from "@tanstack/react-router";
import { Mail, Shield, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile · FaceGate" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        Account
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Your profile</h1>

      <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6 shadow-glow">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-2xl font-bold text-primary ring-2 ring-primary/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field icon={UserIcon} label="Full name" value={user.name} />
          <Field icon={Mail} label="Email" value={user.email} />
          <Field icon={Shield} label="Role" value={user.role.toUpperCase()} mono />
          <Field
            icon={Shield}
            label="Enrolled"
            value={new Date(user.createdAt).toLocaleString()}
            mono
          />
        </dl>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className={`mt-1.5 ${mono ? "font-mono text-sm" : "text-sm font-medium"}`}>
        {value}
      </p>
    </div>
  );
}
