import Link from "next/link";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export function CompactPlacesAndEducation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-6 border-t border-border/40 text-sm">
      {/* Places worked */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          places i worked at
        </h3>
        <div className="space-y-3">
          {DATA.work.map((w: any) => (
            <div key={w.company} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 group">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-6 rounded-md bg-muted border border-border/60 flex items-center justify-center overflow-hidden shrink-0">
                  {w.logoUrl ? (
                    <Image
                      src={w.logoUrl}
                      alt={w.company}
                      width={24}
                      height={24}
                      className="size-full object-contain p-0.5"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {String(w.company)[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <Link
                    href={w.href || "#"}
                    target={w.href && w.href !== "#" ? "_blank" : undefined}
                    className="font-medium text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-sm"
                  >
                    {String(w.company).toLowerCase()}
                    {w.href && w.href !== "#" && (
                      <ArrowUpRight className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                    )}
                  </Link>
                  <span className="text-muted-foreground/40 text-xs">·</span>
                  <span className="text-xs text-muted-foreground">{w.title}</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground/70 shrink-0 tabular-nums pl-8 sm:pl-0">
                {String(w.start).split(" ")[1] || w.start} — {w.end ? String(w.end).split(" ")[1] || w.end : "now"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Where I went to school */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          where i went to school
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-6 rounded-md bg-muted border border-border/60 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/iim.png"
                  alt="IIM Indore"
                  width={24}
                  height={24}
                  className="size-full object-contain p-0.5"
                />
              </div>
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <Link
                  href="https://www.iimidr.ac.in/"
                  target="_blank"
                  className="font-medium text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-sm"
                >
                  iim indore
                  <ArrowUpRight className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </Link>
                <span className="text-muted-foreground/40 text-xs">·</span>
                <span className="text-xs text-muted-foreground">ipm</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground/70 shrink-0 tabular-nums pl-8 sm:pl-0">
              2015 — 2020
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
