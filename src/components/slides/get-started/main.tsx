import { ArrowUpRight, BookOpen, MapPin, Rocket } from "lucide-react";
import type { ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { SlideProps } from "@/components/slides/types";
import { Card } from "@/components/ui/card";
import { SlideFrame } from "@/components/ui/slide-frame";
import { cn } from "@/lib/utils";

const DOCS_URL = "https://aka.ms/aca/express";

interface Cta {
  icon: typeof Rocket;
  label: string;
  detail: string;
  linkLabel: string;
  href: string;
}

const ctas: Cta[] = [
  {
    icon: Rocket,
    label: "Create an app",
    detail: "One form, or the CLI.",
    linkLabel: "Open the Express UI",
    href: "https://containerapps.azure.com/",
  },
  {
    icon: MapPin,
    label: "Preview regions",
    detail: "West Central US · East Asia.",
    linkLabel: "Region details",
    href: "https://learn.microsoft.com/azure/container-apps/express-faq",
  },
  {
    icon: BookOpen,
    label: "Docs & FAQ",
    detail: "Capabilities & live feature matrix.",
    linkLabel: "Express overview",
    href: "https://learn.microsoft.com/azure/container-apps/express-overview",
  },
];

export function GetStarted({
  cycleIndex,
  onSelectCycle,
}: SlideProps): ReactNode {
  return (
    <SlideFrame eyebrow="Get started" title="Try it today.">
      <div className="flex min-w-0 flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xl font-medium leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
            Public preview. A live URL in the time it takes to finish this talk.
          </p>
          {/* Functional QR: white tile + dark modules for reliable scanning. */}
          <div className="flex shrink-0 items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="rounded-md bg-white p-2">
              <QRCodeSVG
                value={DOCS_URL}
                size={92}
                bgColor="#ffffff"
                fgColor="#0a102a"
                level="M"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Scan to start
              </p>
              <p className="text-xs text-muted-foreground">
                aka.ms/aca/express
              </p>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
          {ctas.map((cta, index) => {
            const Icon = cta.icon;
            const isActive = index === cycleIndex;

            return (
              <Card
                key={cta.label}
                onClick={() => onSelectCycle(index)}
                className={cn(
                  "flex min-w-0 cursor-pointer flex-col gap-4 border-2 p-6 transition-colors duration-300",
                  isActive ? "border-primary" : "border-border",
                )}
              >
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
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-foreground">
                    {cta.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {cta.detail}
                  </p>
                </div>
                <a
                  href={cta.href}
                  rel="noreferrer"
                  target="_blank"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {cta.linkLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Card>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
