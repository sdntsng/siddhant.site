import Link from "next/link";
import { PROTOTYPE_VARIANTS } from "@/components/prototypes/variants";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Homepage prototypes",
  robots: { index: false, follow: false },
};

const intensityStyles = {
  subtle: "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300",
  moderate: "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-200",
  structural: "border-sky-500/30 bg-sky-500/5 text-sky-900 dark:text-sky-200",
};

export default function PrototypeHubPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight lowercase">homepage directions</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Three incremental prototypes plus the live site. Each step adds a little more distance from
          the Magic UI portfolio template without jumping to a full redesign. Open each in a tab,
          scroll the full page, and note what feels like you.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground">
          baseline
        </h2>
        <Link
          href="/"
          className="block rounded-xl border p-5 hover:border-foreground/20 transition-colors"
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="font-medium">Current live homepage</span>
            <span className="text-xs text-muted-foreground">siddhant.site/</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Inter, BlurFade stagger, bottom dock, resume cards, 2-col project grid — the Magic UI
            starting point with your content layered in.
          </p>
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground">
          prototypes
        </h2>
        <div className="grid gap-4">
          {PROTOTYPE_VARIANTS.map((variant) => (
            <Link
              key={variant.id}
              href={`/prototype/${variant.id}`}
              className="block rounded-xl border p-5 hover:border-foreground/20 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-medium">{variant.name}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-wide rounded-full border px-2 py-0.5",
                    intensityStyles[variant.intensity],
                  )}
                >
                  {variant.intensity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{variant.summary}</p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
                    changes
                  </p>
                  <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                    {variant.changes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
                    keeps
                  </p>
                  <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                    {variant.keeps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">How to give feedback</p>
        <p>
          Tell me which elements to keep from which variant — for example: “A’s typography, B’s top
          bar, C’s work list but keep the project grid from A.” Nothing here ships until you pick.
        </p>
      </section>
    </div>
  );
}
