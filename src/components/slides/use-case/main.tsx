import { ArrowRight, Check } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

// Hourly request volume across a day: idle overnight, busy 9–5, quiet by night.
const VOLUME = [
  0.02, 0.02, 0.01, 0.01, 0.02, 0.04, 0.12, 0.46, 0.76, 0.9, 0.85, 0.88, 0.7,
  0.82, 0.95, 0.88, 0.8, 0.6, 0.4, 0.28, 0.18, 0.1, 0.05, 0.03,
];
const WAKE_HOUR = 7;

const W = 520;
const H = 210;
const PAD = { top: 18, right: 12, bottom: 26, left: 12 };

function x(hour: number): number {
  return PAD.left + (hour / 23) * (W - PAD.left - PAD.right);
}
function y(volume: number): number {
  return H - PAD.bottom - volume * (H - PAD.top - PAD.bottom);
}

function linePath(): string {
  const pts = VOLUME.map((v, i) => [x(i), y(v)] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const axisTicks = [
  { hour: 0, label: "12am" },
  { hour: 6, label: "6am" },
  { hour: 12, label: "12pm" },
  { hour: 18, label: "6pm" },
  { hour: 23, label: "12am" },
];

const fits = [
  "Same scale-to-zero economics.",
  "No cold-start wall for the first user.",
  "New endpoints live in seconds.",
];

const standardChips = [
  "Private VNet",
  "Managed identity",
  "Jobs",
  "TCP",
  "Service discovery",
  "GPU workloads",
];

function TrafficChart({
  isActive,
  reduced,
}: {
  isActive: boolean;
  reduced: boolean;
}) {
  const line = linePath();
  const area = `${line} L ${x(23)} ${H - PAD.bottom} L ${x(0)} ${H - PAD.bottom} Z`;
  const wakeX = x(WAKE_HOUR);
  const wakeY = y(VOLUME[WAKE_HOUR]);
  const drawn = reduced || isActive;
  const animate = isActive && !reduced;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Request volume across a day: idle overnight, busy during working hours. The first request after the idle period is marked."
    >
      <defs>
        <linearGradient id="traffic-fill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.35"
          />
          <stop
            offset="100%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.02"
          />
        </linearGradient>
      </defs>

      {/* baseline */}
      <line
        x1={PAD.left}
        y1={H - PAD.bottom}
        x2={W - PAD.right}
        y2={H - PAD.bottom}
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />

      {/* scaled-to-zero region label */}
      <text
        x={x(3)}
        y={H - PAD.bottom - 10}
        textAnchor="middle"
        className="fill-muted-foreground/70"
        fontSize="11"
      >
        scaled to zero
      </text>

      {/* area */}
      <path
        d={area}
        fill="url(#traffic-fill)"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reduced ? "none" : "opacity 900ms ease 300ms",
        }}
      />

      {/* line */}
      <path
        d={line}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: reduced
            ? "none"
            : "stroke-dashoffset 1300ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      {/* wake guide + marker */}
      <line
        x1={wakeX}
        y1={wakeY}
        x2={wakeX}
        y2={H - PAD.bottom}
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="3 3"
        style={{
          opacity: drawn ? 0.7 : 0,
          transition: reduced ? "none" : "opacity 400ms ease 1100ms",
        }}
      />
      {animate ? (
        <circle cx={wakeX} cy={wakeY} r="10" fill="hsl(var(--primary))">
          <animate
            attributeName="r"
            values="6;14;6"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      ) : null}
      <circle
        cx={wakeX}
        cy={wakeY}
        r="5"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reduced ? "none" : "opacity 300ms ease 1100ms",
        }}
      />
      <text
        x={wakeX + 10}
        y={wakeY - 8}
        className="fill-foreground"
        fontSize="12"
        fontWeight="600"
        style={{
          opacity: drawn ? 1 : 0,
          transition: reduced ? "none" : "opacity 400ms ease 1300ms",
        }}
      >
        First request after idle
      </text>

      {/* x-axis ticks */}
      {axisTicks.map((tick) => (
        <text
          key={tick.label + tick.hour}
          x={x(tick.hour)}
          y={H - 6}
          textAnchor="middle"
          className="fill-muted-foreground/70"
          fontSize="11"
        >
          {tick.label}
        </text>
      ))}
    </svg>
  );
}

export function UseCase({ isActive }: SlideProps) {
  const reduced = useReducedMotion();

  return (
    <SlideFrame eyebrow="Use case" title="When Express wins.">
      <div className="flex min-w-0 flex-col gap-5">
        <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          <span className="font-semibold text-foreground">The scenario:</span> a
          scale-to-zero web app or AI-agent endpoint — busy by day, idle
          overnight.
        </p>

        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="flex min-w-0 flex-col gap-2 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              A day of traffic
            </p>
            <TrafficChart isActive={isActive} reduced={reduced} />
          </Card>

          <div className="flex min-w-0 flex-col justify-center gap-5">
            <Card className="flex min-w-0 flex-col gap-2 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                First request after idle
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold tabular-nums text-muted-foreground line-through decoration-muted-foreground/50">
                  ~20 s
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                />
                <span className="text-4xl font-semibold tabular-nums text-primary">
                  ~1.5 s
                </span>
              </div>
            </Card>

            <ul className="flex flex-col gap-2.5 px-1">
              {fits.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  />
                  <span className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <SourceCite
              className="px-1"
              sources={[
                {
                  label: "Cold start (blog)",
                  href: "https://techcommunity.microsoft.com/blog/appsonazureblog/azure-container-apps-express-for-shipping-container-apps-fast/4531371",
                },
                {
                  label: "When to use express (Learn)",
                  href: "https://learn.microsoft.com/azure/container-apps/express-overview",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Reach for Standard when&hellip;
          </span>
          {standardChips.map((chip) => (
            <span
              key={chip}
              className={cn(
                "rounded-full border border-border bg-muted/40 px-3 py-1",
                "text-xs font-medium text-muted-foreground",
              )}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
