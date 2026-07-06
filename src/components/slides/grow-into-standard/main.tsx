import { Boxes, Cpu, Network, PlugZap, Share2, Timer } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";

const capabilities = [
  {
    icon: Cpu,
    label: "GPU workloads",
    detail: "Serverless GPUs.",
  },
  {
    icon: Network,
    label: "Private networking",
    detail: "Custom VNet, private traffic.",
  },
  {
    icon: Timer,
    label: "Jobs & batch",
    detail: "Scheduled & event-driven.",
  },
  {
    icon: PlugZap,
    label: "TCP services",
    detail: "Non-HTTP workloads.",
  },
  {
    icon: Share2,
    label: "Service discovery",
    detail: "Call services by name.",
  },
  {
    icon: Boxes,
    label: "Dapr & more",
    detail: "Dapr & the full feature set.",
  },
];

export function GrowIntoStandard(_props: SlideProps) {
  return (
    <SlideFrame eyebrow="Grow with the family" title="Room to grow.">
      <div className="flex min-w-0 flex-col gap-6">
        <p className="text-lg leading-8 text-muted-foreground sm:text-xl">
          Outgrow Express? Move to Standard —{" "}
          <span className="font-semibold text-foreground">
            same platform, same CLI
          </span>{" "}
          — and unlock the rest.
        </p>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="flex min-w-0 flex-col gap-3 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.detail}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted-foreground">
            Feature set expanding through preview.
          </p>
          <SourceCite
            className="sm:justify-end"
            sources={[
              {
                label: "When to use express & considerations (Learn)",
                href: "https://learn.microsoft.com/azure/container-apps/express-overview",
              },
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
