import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2,
  Database,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import saadImg from "@/assets/team-saad.jpeg";
import asimImg from "@/assets/team-asim.jpeg";
import shaheerImg from "@/assets/team-shaheer.jpeg";
import ammarImg from "@/assets/team-ammar.jpeg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team · FaceGate" },
      {
        name: "description",
        content:
          "Meet the FaceGate team — the minds behind a secure, passwordless face recognition authentication system.",
      },
      { property: "og:title", content: "Meet the Team · FaceGate" },
      {
        property: "og:description",
        content:
          "The minds behind this secure authentication system — frontend, backend, database, and security engineering.",
      },
    ],
  }),
  component: TeamPage,
});

interface Member {
  name: string;
  role: string;
  id: string;
  image: string;
  icon: typeof Code2;
  description: string;
  bio: string;
  accent: "primary" | "accent" | "success" | "warning";
}

const team: Member[] = [
  {
    name: "Hasnain Saad",
    id: "B23F0403CYS03",
    role: "Frontend Developer",
    image: saadImg,
    icon: Code2,
    description:
      "Responsible for designing and implementing the user interface.",
    bio: "A passionate frontend developer focused on creating intuitive and responsive user interfaces. Has strong skills in modern web technologies and UI/UX design, ensuring a smooth and engaging user experience.",
    accent: "primary",
  },
  {
    name: "Asim Saeed",
    id: "B23F0297CYS068",
    role: "Database Engineer",
    image: asimImg,
    icon: Database,
    description: "Handles database design and data management.",
    bio: "Skilled in database architecture and data security. Experienced in designing efficient and secure storage systems, ensuring data integrity and optimized performance for authentication systems.",
    accent: "success",
  },
  {
    name: "Shaheer Ahmad",
    id: "B23F0398CYS065",
    role: "Backend Developer",
    image: shaheerImg,
    icon: Server,
    description: "Develops backend logic and API integration.",
    bio: "Backend-focused developer with experience in building secure and scalable systems using Flask. Strong understanding of APIs, authentication mechanisms, and server-side logic.",
    accent: "accent",
  },
  {
    name: "Muhammad Ammar",
    id: "B23F0411CYS041",
    role: "Session & Security Manager",
    image: ammarImg,
    icon: ShieldCheck,
    description: "Manages authentication flow and system security.",
    bio: "Focused on cybersecurity principles, including session management, authentication security, and system protection. Ensures the application follows best security practices and mitigates common vulnerabilities.",
    accent: "warning",
  },
];

function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 cyber-grid opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Meet the Team
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl animate-fade-in">
            The minds behind this{" "}
            <span className="text-primary">secure authentication</span> system
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground animate-fade-in">
            Four engineers collaborating across frontend, backend, data, and
            security to build a trustworthy passwordless experience.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {team.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card/60 p-8 text-center animate-fade-in">
          <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">
            Built for secure, passwordless access
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Try FaceGate's biometric login flow or enroll a new identity to see
            the system in action.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Login with Face</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const Icon = member.icon;
  const accentMap = {
    primary: {
      text: "text-primary",
      ring: "ring-primary/40",
      bg: "bg-primary/10",
      glow: "from-primary/30",
    },
    accent: {
      text: "text-accent",
      ring: "ring-accent/40",
      bg: "bg-accent/10",
      glow: "from-accent/30",
    },
    success: {
      text: "text-success",
      ring: "ring-success/40",
      bg: "bg-success/10",
      glow: "from-success/30",
    },
    warning: {
      text: "text-warning",
      ring: "ring-warning/40",
      bg: "bg-warning/10",
      glow: "from-warning/30",
    },
  } as const;
  const a = accentMap[member.accent];

  return (
    <article
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow animate-fade-in"
    >
      {/* Ambient glow on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${a.glow} via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Avatar */}
        <div className="relative shrink-0 self-start">
          <div
            className={`absolute -inset-1 rounded-2xl ring-1 ${a.ring} ${a.bg} opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-100`}
          />
          <img
            src={member.image}
            alt={`Portrait of ${member.name}`}
            width={512}
            height={512}
            loading="lazy"
            className="relative h-28 w-28 rounded-2xl object-cover ring-2 ring-border transition-transform duration-300 group-hover:scale-[1.03] sm:h-32 sm:w-32"
          />
          <span
            className={`absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-lg ring-1 ${a.ring} ${a.bg} ${a.text} backdrop-blur`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold leading-tight">
                {member.name}
              </h3>
              <p className={`text-sm font-medium ${a.text}`}>{member.role}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
              <a
                href="#"
                aria-label={`${member.name} on GitHub`}
                className="grid h-8 w-8 place-items-center rounded-md border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label={`${member.name} on LinkedIn`}
                className="grid h-8 w-8 place-items-center rounded-md border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            ID · {member.id}
          </p>

          <p className="mt-3 text-sm font-medium text-foreground/90">
            {member.description}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {member.bio}
          </p>
        </div>
      </div>
    </article>
  );
}
