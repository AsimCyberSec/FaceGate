import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

export const Route = createFileRoute("/_app/admin/access")({
  head: () => ({ meta: [{ title: "Access Control · FaceGate" }] }),
  component: AccessPage,
});

interface Rule {
  resource: string;
  admin: boolean;
  user: boolean;
  anon: boolean;
}

const rules: Rule[] = [
  { resource: "GET /", admin: true, user: true, anon: true },
  { resource: "POST /register", admin: true, user: true, anon: true },
  { resource: "POST /login-face", admin: true, user: true, anon: true },
  { resource: "GET /dashboard/*", admin: true, user: true, anon: false },
  { resource: "GET /admin/*", admin: true, user: false, anon: false },
  { resource: "GET /users", admin: true, user: false, anon: false },
  { resource: "DELETE /user/:id", admin: true, user: false, anon: false },
];

function AccessPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        Administration · Policy
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Access Control</h1>
      <p className="mt-2 text-muted-foreground">
        RBAC policy matrix enforced by Flask middleware.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-secondary/40 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3 text-center">Admin</th>
              <th className="px-4 py-3 text-center">User</th>
              <th className="px-4 py-3 text-center">Anonymous</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rules.map((r) => (
              <tr key={r.resource} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-mono text-xs">{r.resource}</td>
                <td className="px-4 py-3 text-center"><Mark allow={r.admin} /></td>
                <td className="px-4 py-3 text-center"><Mark allow={r.user} /></td>
                <td className="px-4 py-3 text-center"><Mark allow={r.anon} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-card/40 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-success" />
        Unauthorized requests are rejected by backend middleware before reaching handlers.
      </div>
    </div>
  );
}

function Mark({ allow }: { allow: boolean }) {
  return allow ? (
    <CheckCircle2 className="mx-auto h-4 w-4 text-success" />
  ) : (
    <XCircle className="mx-auto h-4 w-4 text-destructive" />
  );
}
