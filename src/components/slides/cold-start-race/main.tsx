import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Play, RotateCcw, Zap } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isPresentationExportMode } from "@/lib/export-mode";
import { cn } from "@/lib/utils";

type Phase = "idle" | "running" | "done";

interface Lane {
  id: "express" | "consumption";
  name: string;
  sub: string;
  /** Real measured seconds this lane counts up to. */
  seconds: number;
  /** Stage-compressed duration of the animation in ms. */
  durationMs: number;
  hero: boolean;
}

const LANES: Lane[] = [
  {
    id: "express",
    name: "Express",
    sub: "Wakes from a prewarmed pool",
    seconds: 1.5,
    durationMs: 1400,
    hero: true,
  },
  {
    id: "consumption",
    name: "Consumption environment",
    sub: "Rebuilds runtime from cold",
    seconds: 20,
    durationMs: 4200,
    hero: false,
  },
];

type Progress = Record<Lane["id"], number>;

const FULL_PROGRESS: Progress = { express: 1, consumption: 1 };
const ZERO_PROGRESS: Progress = { express: 0, consumption: 0 };

function formatSeconds(lane: Lane, progress: number): string {
  const current = lane.seconds * progress;
  if (lane.id === "express") {
    return `${current.toFixed(1)} s`;
  }
  return `${Math.round(current)} s`;
}

export function ColdStartRace({ isActive }: SlideProps) {
  const reduced = useReducedMotion();
  const exportMode = isPresentationExportMode();
  const [phase, setPhase] = useState<Phase>(exportMode ? "done" : "idle");
  const [progress, setProgress] = useState<Progress>(
    exportMode ? FULL_PROGRESS : ZERO_PROGRESS,
  );
  const frame = useRef<number>(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setProgress(ZERO_PROGRESS);
    setPhase("idle");
  }, [stop]);

  useEffect(() => {
    if (!isActive && !exportMode) {
      reset();
    }
    return stop;
  }, [isActive, exportMode, reset, stop]);

  const run = useCallback(() => {
    if (!isActive) {
      return;
    }
    stop();

    if (reduced) {
      setProgress(FULL_PROGRESS);
      setPhase("done");
      return;
    }

    setProgress(ZERO_PROGRESS);
    setPhase("running");
    let start = 0;

    const step = (now: number) => {
      if (!start) {
        start = now;
      }
      const elapsed = now - start;
      const next: Progress = {
        express: Math.min(elapsed / LANES[0].durationMs, 1),
        consumption: Math.min(elapsed / LANES[1].durationMs, 1),
      };
      setProgress(next);

      if (next.express < 1 || next.consumption < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setPhase("done");
      }
    };

    frame.current = requestAnimationFrame(step);
  }, [isActive, reduced, stop]);

  return (
    <SlideFrame
      eyebrow="Live demo · Cold-start race"
      title="Same app. From zero."
    >
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Both apps have scaled to zero. Send one request.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" onClick={run} disabled={phase === "running"}>
              <Play aria-hidden="true" className="h-4 w-4" />
              {phase === "idle" ? "Send request" : "Run again"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              disabled={phase === "idle"}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          {LANES.map((lane, index) => {
            const p = progress[lane.id];
            const resolved = p >= 1;
            const started = phase !== "idle";
            const isWaking = started && !resolved;

            return (
              <Card
                key={lane.id}
                className={cn(
                  "min-w-0 p-5 transition-colors duration-500",
                  resolved && lane.hero && "border-primary",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold leading-tight text-foreground">
                      {lane.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{lane.sub}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={cn(
                        "hidden text-xs font-semibold uppercase tracking-[0.16em] sm:inline",
                        resolved ? "text-foreground" : "text-muted-foreground",
                        isWaking && "animate-pulse",
                      )}
                    >
                      {isWaking
                        ? "Waking…"
                        : resolved
                          ? "200 OK"
                          : "Scaled to zero"}
                    </span>
                    <span
                      className={cn(
                        "w-24 text-right text-4xl font-semibold tabular-nums transition-colors sm:w-28 sm:text-5xl",
                        lane.hero ? "text-primary" : "text-foreground",
                        !started && "text-muted-foreground/40",
                      )}
                    >
                      {formatSeconds(lane, p)}
                    </span>
                  </div>
                </div>

                {/* Race track */}
                <div className="relative mt-5 h-3">
                  <div className="absolute inset-0 rounded-full bg-muted" />
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      lane.hero
                        ? "bg-gradient-to-r from-primary/30 to-primary"
                        : "bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/60",
                    )}
                    style={{ width: `${p * 100}%` }}
                  />
                  {/* Finish line */}
                  <div className="absolute inset-y-[-3px] right-0 w-px bg-border" />
                  {/* Request token / comet */}
                  {started ? (
                    <span
                      className={cn(
                        "absolute top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-4",
                        lane.hero
                          ? "bg-primary text-primary-foreground ring-primary/25"
                          : "bg-muted-foreground text-background ring-muted-foreground/20",
                        isWaking && "animate-pulse",
                      )}
                      style={{ left: `${p * 100}%` }}
                    >
                      {resolved ? (
                        <Check aria-hidden="true" className="h-4 w-4" />
                      ) : null}
                    </span>
                  ) : null}
                </div>

                {index === 0 ? (
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground/70">
                    <span>Request sent</span>
                    <span>First response</span>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={cn(
              "flex min-h-[1.75rem] items-center gap-2 text-base font-semibold transition-opacity duration-500",
              phase === "done" ? "opacity-100" : "opacity-0",
            )}
          >
            <Zap aria-hidden="true" className="h-5 w-5 text-primary" />
            <span className="text-foreground">
              Express answered about 13× faster from a genuine cold start.
            </span>
          </p>
          <SourceCite
            className="sm:justify-end"
            prefix="Measured"
            sources={[
              {
                label: "Reference demo — same image, West Central US (blog)",
                href: "https://techcommunity.microsoft.com/blog/appsonazureblog/azure-container-apps-express-for-shipping-container-apps-fast/4531371",
              },
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
