import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Eye,
  Fingerprint,
  KeyRound,
  Lock,
  ScanFace,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FaceGate — Secure Authentication Without Passwords" },
      {
        name: "description",
        content:
          "Replace passwords with biometric face recognition. Built-in role-based access control, replay protection and rate limiting.",
      },
      { property: "og:title", content: "FaceGate — Secure Authentication Without Passwords" },
      {
        property: "og:description",
        content:
          "Biometric login powered by face recognition with admin and user dashboards.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="font-mono uppercase tracking-widest text-muted-foreground">
              AI · Biometric · RBAC
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Secure Authentication{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Without Passwords
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FaceGate replaces fragile credentials with real-time facial recognition.
            Authenticate in seconds, then unlock the right resources through
            granular role-based access control.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/register">
                Register
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">
                <ScanFace className="mr-1 h-4 w-4" />
                Login with Face
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-6">
            {[
              { v: "0 PWD", l: "Passwords stored" },
              { v: "<2s", l: "Avg auth time" },
              { v: "RBAC", l: "Access control" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-xl font-semibold text-foreground">{s.v}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative animate-fade-in-up">
      <div className="absolute -inset-8 rounded-3xl bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative rounded-3xl border border-border bg-card/70 p-6 shadow-glow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Secure session
            </span>
          </div>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border border-primary/30 bg-secondary/40">
          {/* Stylized face placeholder */}
          <div className="absolute inset-0 grid place-items-center">
            <Fingerprint className="h-40 w-40 text-primary/40" />
          </div>
          {/* Brackets */}
          <div className="absolute left-4 top-4 h-10 w-10 rounded-tl-md border-l-2 border-t-2 border-primary animate-corner-pulse" />
          <div className="absolute right-4 top-4 h-10 w-10 rounded-tr-md border-r-2 border-t-2 border-primary animate-corner-pulse" />
          <div className="absolute bottom-4 left-4 h-10 w-10 rounded-bl-md border-b-2 border-l-2 border-primary animate-corner-pulse" />
          <div className="absolute bottom-4 right-4 h-10 w-10 rounded-br-md border-b-2 border-r-2 border-primary animate-corner-pulse" />
          {/* Scan line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 animate-scan-line bg-gradient-to-b from-primary via-primary/70 to-transparent shadow-glow" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <p className="font-mono text-muted-foreground">FACE_ID</p>
            <p className="mt-1 font-mono text-foreground">0xA9F2…4C81</p>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <p className="font-mono text-muted-foreground">ROLE</p>
            <p className="mt-1 font-mono text-accent">ADMIN · GRANTED</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: ScanFace,
    title: "Face Recognition Login",
    desc: "128-dimensional facial encodings via dlib for accurate, fast identification.",
  },
  {
    icon: KeyRound,
    title: "Passwordless Security",
    desc: "Eliminates phishing, credential stuffing and password reuse vulnerabilities.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    desc: "Granular permissions for Admin and Standard User roles enforced server-side.",
  },
  {
    icon: Zap,
    title: "Replay Attack Prevention",
    desc: "Fresh capture required per login — no static images or stored frames accepted.",
  },
  {
    icon: Lock,
    title: "Rate Limiting",
    desc: "Failed attempts are throttled to mitigate brute-force and enumeration attacks.",
  },
  {
    icon: Eye,
    title: "Encoding-Only Storage",
    desc: "Only serialized vectors are stored. Original images are never persisted.",
  },
];

function Features() {
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineered for security, designed for humans
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30 transition-colors group-hover:bg-primary/25">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    icon: Camera,
    title: "Register Face",
    desc: "Capture your face once via webcam. We extract a 128-D encoding.",
  },
  {
    n: "02",
    icon: ScanFace,
    title: "Scan Face",
    desc: "Look at the camera. Live capture is matched against your encoding.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Get Access",
    desc: "Authenticated session created. RBAC routes you to the right dashboard.",
  },
];

function HowItWorks() {
  return (
    <section className="border-t border-border/60 bg-secondary/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps. Zero passwords.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-border bg-card/60 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-card/70 p-10 text-center shadow-glow-lg">
          <div className="absolute inset-0 cyber-grid opacity-40" aria-hidden />
          <div className="relative">
            <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Ready to ditch the password?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Register your face in under a minute. Login takes seconds.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/register">Create account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Login with Face</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
