import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface Row {
  measure: string;
  express: number;
  consumption: number;
}

const rows: Row[] = [
  { measure: "Cold start from zero", express: 1.5, consumption: 20 },
  { measure: "Environment provisioning", express: 14, consumption: 120 },
  { measure: "First-time deploy", express: 52, consumption: 166 },
  { measure: "App deploy (env exists)", express: 30, consumption: 30 },
];

function formatDuration(value: number, target: number): string {
  const rounded =
    target % 1 !== 0 ? value.toFixed(1) : String(Math.round(value));
  return `${rounded} s`;
}

function isEqualish(row: Row): boolean {
  return row.consumption / row.express <= 1.05;
}

function ratioLabel(row: Row): string {
  if (isEqualish(row)) {
    return "About the same";
  }
  return `${(row.consumption / row.express).toFixed(1)}× faster`;
}

interface MetricRowProps {
  row: Row;
  isSelected: boolean;
  active: boolean;
  reduced: boolean;
  delay: number;
  onSelect: () => void;
}

function MetricRow({
  row,
  isSelected,
  active,
  reduced,
  delay,
  onSelect,
}: MetricRowProps) {
  const expressVal = useCountUp({
    to: row.express,
    active,
    duration: 1000,
    delay,
  });
  const consVal = useCountUp({
    to: row.consumption,
    active,
    duration: 1000,
    delay: delay + 80,
  });
  const equal = isEqualish(row);
  const expressWidth = active ? (row.express / row.consumption) * 100 : 0;

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "min-w-0 cursor-pointer border-2 px-5 py-4 transition-colors duration-300",
        isSelected ? "border-primary" : "border-border",
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-base font-semibold text-foreground sm:text-lg">
          {row.measure}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tabular-nums text-primary sm:text-xl">
            {formatDuration(expressVal, row.express)}
          </span>
          <span className="text-xs text-muted-foreground/60">vs</span>
          <span className="text-lg font-semibold tabular-nums text-muted-foreground sm:text-xl">
            {formatDuration(consVal, row.consumption)}
          </span>
          <span
            className={cn(
              "ml-1 text-xs font-semibold",
              equal ? "text-muted-foreground" : "text-primary",
            )}
          >
            {ratioLabel(row)}
          </span>
        </div>
      </div>

      {/* Full track = Consumption; violet fill = Express's proportional slice. */}
      <div className="relative mt-3 h-6 w-full overflow-hidden rounded-md bg-muted/60">
        <div
          className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-primary/50 to-primary"
          style={{
            width: `${expressWidth}%`,
            transitionProperty: "width",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDuration: reduced ? "0ms" : "1000ms",
            transitionDelay: reduced ? "0ms" : `${delay}ms`,
          }}
        />
      </div>
    </Card>
  );
}

export function TheNumbers({
  isActive,
  cycleIndex,
  onSelectCycle,
}: SlideProps) {
  const reduced = useReducedMotion();

  return (
    <SlideFrame eyebrow="The numbers" title="Where the time goes.">
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-4 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
            Express
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/50" />
            Consumption
          </span>
        </div>

        {rows.map((row, index) => (
          <MetricRow
            key={row.measure}
            row={row}
            isSelected={index === cycleIndex}
            active={isActive}
            reduced={reduced}
            delay={index * 110}
            onSelect={() => onSelectCycle(index)}
          />
        ))}

        <div className="flex min-w-0 flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground">
              Express wins where infrastructure is built from scratch.
            </span>{" "}
            Once it exists, deploys are about equal.
          </p>
          <SourceCite
            className="sm:justify-end"
            prefix="Measured"
            sources={[
              {
                label: "Same image, West Central US (blog)",
                href: "https://techcommunity.microsoft.com/blog/appsonazureblog/azure-container-apps-express-for-shipping-container-apps-fast/4531371",
              },
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
