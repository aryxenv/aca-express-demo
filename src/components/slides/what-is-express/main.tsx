import { Cpu, Info, Moon, Package, Wand2 } from "lucide-react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { SourceCite } from "@/components/ui/source-cite";

const capabilities = [
  {
    icon: Package,
    label: "Image → HTTPS URL",
    detail: "Container in, endpoint out.",
  },
  {
    icon: Moon,
    label: "Scale to zero",
    detail: "Pay-as-you-go CPU.",
  },
  {
    icon: Cpu,
    label: "Optimized cold start",
    detail: "Ready fast after idle.",
  },
  {
    icon: Wand2,
    label: "Opinionated defaults",
    detail: "Scaling & networking handled.",
  },
];

export function WhatIsExpress(_props: SlideProps) {
  return (
    <SlideFrame eyebrow="What is Express" title="Just bring your image.">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="flex min-w-0 flex-col gap-5 lg:justify-center">
          <p className="text-xl font-semibold leading-8 text-foreground sm:text-2xl sm:leading-9">
            Environmentless Container
          </p>

          <Card className="flex min-w-0 items-start gap-3 bg-muted/40 p-4">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            />
            <p className="text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground">
                No environment to stand up.
              </span>{" "}
              The platform provisions and manages a shared one for you.
            </p>
          </Card>

          <SourceCite
            sources={[
              {
                label: "Express overview (Learn)",
                href: "https://learn.microsoft.com/azure/container-apps/express-overview",
              },
              {
                label: "Express FAQ (Learn)",
                href: "https://learn.microsoft.com/azure/container-apps/express-faq",
              },
            ]}
          />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
    </SlideFrame>
  );
}
