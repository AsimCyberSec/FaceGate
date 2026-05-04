import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_app/admin/logs")({
  head: () => ({ meta: [{ title: "System Logs · FaceGate" }] }),
  component: LogsPage,
});

interface LogEntry {
  ts: string;
  level: "info" | "warn" | "error";
  event: string;
  detail: string;
}

const sample: LogEntry[] = [
  { ts: "12:04:33", level: "info", event: "AUTH_SUCCESS", detail: "user=admin@facegate.dev distance=0.31" },
  { ts: "12:04:11", level: "info", event: "SESSION_CREATED", detail: "ttl=3600s role=admin" },
  { ts: "12:01:02", level: "warn", event: "AUTH_FAILED", detail: "no match · distance>0.6" },
  { ts: "11:58:47", level: "info", event: "USER_REGISTERED", detail: "encoding stored 128-D" },
  { ts: "11:42:19", level: "error", event: "RATE_LIMIT_HIT", detail: "ip=10.0.0.21 attempts=5" },
  { ts: "11:30:00", level: "info", event: "SERVICE_START", detail: "flask · face_recognition v1.3" },
];

function LogsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        Administration · Telemetry
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">System Logs</h1>
      <p className="mt-2 text-muted-foreground">
        Recent authentication events and system activity.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/60">
        <div className="border-b border-border/60 bg-secondary/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          /var/log/facegate/auth.log
        </div>
        <ul className="divide-y divide-border/40">
          {sample.map((log, i) => (
            <li
              key={i}
              className="flex items-start gap-4 px-4 py-3 font-mono text-sm hover:bg-secondary/30"
            >
              <span className="shrink-0 text-muted-foreground">{log.ts}</span>
              <LevelBadge level={log.level} />
              <span className="shrink-0 font-semibold">{log.event}</span>
              <span className="text-muted-foreground">{log.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-success" />
        Logs are sample data. Connect the Flask backend to stream live events.
      </div>
    </div>
  );
}

function LevelBadge({ level }: { level: LogEntry["level"] }) {
  const map = {
    info: { Icon: CheckCircle2, cls: "text-success" },
    warn: { Icon: Activity, cls: "text-warning" },
    error: { Icon: AlertTriangle, cls: "text-destructive" },
  } as const;
  const { Icon, cls } = map[level];
  return (
    <span className={`flex w-16 shrink-0 items-center gap-1 ${cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {level.toUpperCase()}
    </span>
  );
}
