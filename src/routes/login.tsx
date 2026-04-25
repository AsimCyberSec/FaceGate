import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, ScanFace, ShieldCheck, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaceCapture } from "@/components/FaceCapture";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";
import { loginWithFace } from "@/services/auth-api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login · FaceGate" },
      {
        name: "description",
        content: "Authenticate using face recognition. No password required.",
      },
    ],
  }),
  component: LoginPage,
});

type Status = "idle" | "scanning" | "success" | "failed" | "no-face" | "rate-limited";

const MAX_ATTEMPTS = 5;

function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleCapture = async (dataUrl: string, descriptor?: number[]) => {
    if (!dataUrl) return;
    if (attempts >= MAX_ATTEMPTS) {
      setStatus("rate-limited");
      setStatusMessage("Too many attempts. Please wait a moment.");
      return;
    }

    if (!descriptor || descriptor.length === 0) {
      setStatus("no-face");
      setStatusMessage("No face detected. Please position your face in the frame and try again.");
      toast.error("No face detected");
      return;
    }

    setStatus("scanning");
    setStatusMessage("Scanning…");

    try {
      const user = await loginWithFace(descriptor);
      setStatus("success");
      setStatusMessage("Face matched · Authenticating");
      toast.success(`Welcome back, ${user.name}`);
      setTimeout(() => {
        setUser(user);
        navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
      }, 700);
    } catch (err) {
      setAttempts((n) => n + 1);
      setStatus("failed");
      setStatusMessage("Access denied · Face not recognized. Are you registered?");
      toast.error("Access denied", { description: "This face does not match any registered user." });
    }
  };

  const remaining = Math.max(0, MAX_ATTEMPTS - attempts);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Authentication · Biometric
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Login with your face
            </h1>
            <p className="mt-3 text-muted-foreground">
              Position your face inside the frame and click <strong>Scan Face</strong>.
              We never store the captured frame — only a one-way encoding is compared.
            </p>

            <div className="mt-8 space-y-3">
              <StatusCard status={status} message={statusMessage} />

              <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-3 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">Rate limit</span>
                </div>
                <span className="font-mono text-xs">
                  {remaining}/{MAX_ATTEMPTS} attempts remaining
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              No account yet?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Enroll your face
              </Link>
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Live face scan
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                ENCRYPTED · LOCAL
              </span>
            </div>
            <FaceCapture
              mode="scan"
              scanning={status === "scanning"}
              onCapture={handleCapture}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatusCard({ status, message }: { status: Status; message: string }) {
  if (status === "idle") {
    return (
      <Alert>
        <ScanFace className="h-4 w-4" />
        <AlertDescription>
          Ready to authenticate. Center your face in the frame.
        </AlertDescription>
      </Alert>
    );
  }
  if (status === "scanning") {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>{message || "Scanning…"}</AlertDescription>
      </Alert>
    );
  }
  if (status === "success") {
    return (
      <Alert className="border-success/50 bg-success/10 text-success-foreground">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <AlertDescription className="text-foreground">{message}</AlertDescription>
      </Alert>
    );
  }
  if (status === "no-face") {
    return (
      <Alert variant="destructive">
        <ScanFace className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }
  if (status === "failed") {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }
  if (status === "rate-limited") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}