import Link from "next/link";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export function WorkLedger() {
  return (
    <div className="space-y-6">
      {DATA.work.map((w) => (
        <div key={w.company} className="group flex flex-col space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-2">
              <Link
                href={w.href || "#"}
                target={w.href && w.href !== "#" ? "_blank" : undefined}
                className="font-medium tracking-tight text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-base"
              >
                {w.company.toLowerCase()}
                {w.href && w.href !== "#" && (
                  <ArrowUpRight className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-sm text-muted-foreground">{w.title}</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono shrink-0">
              {w.start} — {w.end || "Present"}
            </span>
          </div>
          {w.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {w.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
