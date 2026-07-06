import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SourceLink {
  label: string;
  href: string;
}

interface SourceCiteProps {
  sources: SourceLink[];
  prefix?: string;
  className?: string;
}

export function SourceCite({
  sources,
  prefix = "Source",
  className,
}: SourceCiteProps) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="font-semibold uppercase tracking-[0.16em]">
        {prefix}
      </span>
      {sources.map((source, index) => (
        <span key={source.href} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className="text-muted-foreground/50">
              &middot;
            </span>
          ) : null}
          <a
            className="inline-flex items-center gap-1 font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
            href={source.href}
            rel="noreferrer"
            target="_blank"
          >
            {source.label}
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
        </span>
      ))}
    </p>
  );
}
