import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Loader2, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaceCapture } from "@/components/FaceCapture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerUser } from "@/services/auth-api";
import type { Role } from "@/lib/auth-context";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register · FaceGate" },
      {
        name: "description",
        content: "Create a FaceGate account using webcam-based facial enrollment.",
      },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Invalid email address").max(255),
  role: z.enum(["admin", "user"]),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [face, setFace] = useState<string | null>(null);
  const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ name, email, role });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    if (!face) {
      setError("Please capture your face before registering");
      return;
    }
    if (!faceDescriptor) {
      setError("No face detected. Please retake your photo in good lighting.");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({ ...parsed.data, faceDescriptor });
      toast.success("Registration complete", {
        description: "Your face has been securely enrolled.",
      });
      navigate({ to: "/login" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Account · Enrollment
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Create your FaceGate account
            </h1>
            <p className="mt-2 text-muted-foreground">
              We extract a one-way facial encoding. Your photo is never stored.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card/60 p-6 shadow-glow"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Standard User</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Admins can manage users and view logs. Users get a personal dashboard.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  Your facial encoding is one-way — it cannot be reversed into an image.
                </div>

                <Button type="submit" disabled={submitting} className="w-full" size="lg">
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering…
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register User
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already enrolled?{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Login with face
                  </Link>
                </p>
              </div>
            </form>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Webcam · Live preview
                </h2>
                <span className="font-mono text-[10px] text-muted-foreground">
                  640×480 · MIRRORED
                </span>
              </div>
              <FaceCapture
                onCapture={(d, descriptor) => {
                  setFace(d || null);
                  setFaceDescriptor(descriptor || null);
                }}
                capturedImage={face}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Look directly at the camera in good lighting. Remove glasses & masks
                for best accuracy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}