import { Link, useLocation } from "@tanstack/react-router";
import { Activity, LayoutDashboard, ShieldCheck, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/auth-context";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

interface SidebarProps {
  role: Role;
}

const adminItems: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "User Management", icon: Users },
  { to: "/admin/logs", label: "System Logs", icon: Activity },
  { to: "/admin/access", label: "Access Control", icon: ShieldCheck },
];

const userItems: NavItem[] = [
  { to: "/dashboard", label: "My Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export function Sidebar({ role }: SidebarProps) {
  const items = role === "admin" ? adminItems : userItems;
  const { pathname } = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-sidebar/50 lg:block">
      <div className="sticky top-16 p-4">
        <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {role === "admin" ? "Administrator" : "Standard User"}
        </p>
        <nav className="space-y-1">
          {items.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/admin"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-lg border border-border bg-card/60 p-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            <span className="font-mono uppercase tracking-wide text-muted-foreground">
              Session Active
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Encrypted · Biometric verified
          </p>
        </div>
      </div>
    </aside>
  );
}
