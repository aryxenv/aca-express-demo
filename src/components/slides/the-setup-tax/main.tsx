import { Clock, Server, SlidersHorizontal } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    icon: Server,
    step: "Step 1",
    title: "Stand up an environment",
    detail: "Provision and wait before anything runs.",
  },
  {
    icon: SlidersHorizontal,
    step: "Step 2",
    title: "Configure the plumbing",
    detail: "Networking, scaling, resources — up front.",
  },
  {
    icon: Clock,
    step: "Step 3",
    title: "Then eat the cold start",
    detail: "The first request after idle still crawls.",
  },
];

export function TheSetupTax({ cycleIndex, onSelectCycle }: SlideProps) {
  return (
    <SlideFrame eyebrow="The problem" title="Setup stands in the way.">
      <div className="flex min-w-0 flex-col gap-8">
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
          Every new app pays a setup tax up front.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            const isActive = index === cycleIndex;

            return (
              <Card
                key={point.title}
                onClick={() => onSelectCycle(index)}
                className={cn(
                  "flex min-w-0 cursor-pointer flex-col gap-4 border-2 p-6 transition-colors duration-300",
                  isActive ? "border-primary" : "border-border",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/15 text-primary",
                    )}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {point.step}
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {point.title}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {point.detail}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
