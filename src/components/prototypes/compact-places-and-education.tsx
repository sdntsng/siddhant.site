import Link from "next/link";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export function CompactPlacesAndEducation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-border/40 text-sm">
      {/* Places worked */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          places i worked at
        </h3>
        <div className="space-y-3">
          {DATA.work.map((w) => (
            <div key={w.company} className="flex flex-col space-y-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  href={w.href || "#"}
                  target={w.href && w.href !== "#" ? "_blank" : undefined}
                  className="font-medium text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-sm"
                >
                  {w.company.toLowerCase()}
                  {w.href && w.href !== "#" && (
                    <ArrowUpRight className="size-3 text-muted-foreground" />
                  )}
                </Link>
                <span className="text-[11px] font-mono text-muted-foreground/70">
                  {w.start.split(" ")[1] || w.start} — {w.end ? w.end.split(" ")[1] || w.end : "now"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {w.title} · {w.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Where I went to school */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          where i went to school
        </h3>
        <div className="space-y-3">
          {DATA.education.map((e) => (
            <div key={`${e.school}-${e.degree}`} className="flex flex-col space-y-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  href={e.href || "#"}
                  target="_blank"
                  className="font-medium text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-sm"
                >
                  {e.school.toLowerCase()}
                  <ArrowUpRight className="size-3 text-muted-foreground" />
                </Link>
                <span className="text-[11px] font-mono text-muted-foreground/70">
                  {e.start} — {e.end}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {e.degree}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
