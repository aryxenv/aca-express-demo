import { Clock, Globe, Moon } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";

const highlights = [
  {
    icon: Globe,
    label: "Live URL in seconds",
    detail: "Image in, HTTPS out.",
  },
  {
    icon: Moon,
    label: "Scale to zero",
    detail: "Pay only when it runs.",
  },
  {
    icon: Clock,
    label: "Optimized cold start",
    detail: "~1.5 s, not ~20 s.",
  },
];

export function ExpressTitle(_props: SlideProps) {
  return (
    <SlideFrame eyebrow="ACA Express" title="Ship containers in seconds.">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="text-2xl font-medium leading-9 text-muted-foreground sm:text-3xl sm:leading-10">
            The fastest way to get a containerized web app live on Azure.
          </p>
          <SourceCite
            sources={[
              {
                label:
                  "Azure Container Apps express overview (Microsoft Learn)",
                href: "https://learn.microsoft.com/azure/container-apps/express-overview",
              },
            ]}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="flex min-w-0 items-center gap-4 p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
