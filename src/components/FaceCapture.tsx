import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, ScanFace, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FaceCaptureProps {
  onCapture: (dataUrl: string, descriptor?: number[]) => void;
  capturedImage?: string | null;
  scanning?: boolean;
  mode?: "snapshot" | "scan";
  className?: string;
}

declare global {
  interface Window {
    faceapi: any;
  }
}

export function FaceCapture({
  onCapture,
  capturedImage,
  scanning = false,
  mode = "snapshot",
  className,
}: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Load face-api.js models
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
    script.onload = async () => {
      try {
        const MODEL_URL = "/models";
        await window.faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await window.faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
      } catch (e) {
        console.error("Failed to load face models:", e);
        setModelsLoaded(true); // continue anyway
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
          setError("Webcam not supported in this browser");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unable to access webcam";
        setError(msg.includes("Permission") ? "Camera permission denied" : msg);
      }
    }
    if (!capturedImage) start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setReady(false);
    };
  }, [capturedImage]);

  const handleCapture = async () => {
    const video = videoRef.current;
    if (!video || !ready) return;

    setProcessing(true);

    // Capture image
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    // Extract face descriptor
    let descriptor: number[] | undefined;
    try {
      if (window.faceapi && modelsLoaded) {
        const detection = await window.faceapi
          .detectSingleFace(video)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detection) {
          descriptor = Array.from(detection.descriptor);
        }
      }
    } catch (e) {
      console.error("Face detection error:", e);
    }

    setProcessing(false);
    onCapture(dataUrl, descriptor);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-secondary/50 shadow-glow">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured face" className="h-full w-full object-cover" />
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <VideoOff className="h-10 w-10 text-destructive" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <video ref={videoRef} playsInline muted className="h-full w-full -scale-x-100 object-cover" />
            <CornerBrackets active={ready} />
            {scanning && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 animate-scan-line bg-gradient-to-b from-primary via-primary/60 to-transparent shadow-glow" />
                <div className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-screen" />
              </>
            )}
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs backdrop-blur">
              <span className={cn("h-2 w-2 rounded-full", ready ? "bg-success animate-pulse-glow" : "bg-muted-foreground")} />
              <span className="font-mono">
                {processing ? "PROCESSING" : scanning ? "SCANNING" : ready ? "LIVE" : modelsLoaded ? "READY" : "LOADING"}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        {capturedImage ? (
          <Button type="button" variant="outline" onClick={() => onCapture("")} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake
          </Button>
        ) : mode === "scan" ? (
          <Button type="button" onClick={handleCapture} disabled={!ready || scanning || processing} className="w-full">
            <ScanFace className="mr-2 h-4 w-4" />
            {processing ? "Processing…" : scanning ? "Scanning…" : "Scan Face"}
          </Button>
        ) : (
          <Button type="button" onClick={handleCapture} disabled={!ready || processing} className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            {processing ? "Processing…" : "Capture Face"}
          </Button>
        )}
      </div>
    </div>
  );
}

function CornerBrackets({ active }: { active: boolean }) {
  const base = "absolute h-8 w-8 border-primary";
  const cls = active ? "animate-corner-pulse" : "opacity-50";
  return (
    <>
      <div className={cn(base, cls, "left-3 top-3 border-l-2 border-t-2 rounded-tl-md")} />
      <div className={cn(base, cls, "right-3 top-3 border-r-2 border-t-2 rounded-tr-md")} />
      <div className={cn(base, cls, "left-3 bottom-3 border-l-2 border-b-2 rounded-bl-md")} />
      <div className={cn(base, cls, "right-3 bottom-3 border-r-2 border-b-2 rounded-br-md")} />
    </>
  );
}