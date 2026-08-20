"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { PROTOTYPE_VARIANTS, type PrototypeVariantId } from "@/components/prototypes/variants";
import { useTerminal } from "@/context/terminal";
import { Terminal } from "lucide-react";

export default function PrototypeShell({
  children,
  activeVariant,
}: {
  children: React.ReactNode;
  activeVariant?: PrototypeVariantId;
}) {
  const pathname = usePathname();
  const { toggleMode } = useTerminal();
  const onHub = pathname === "/prototype";
  const activeFromPath = pathname?.replace("/prototype/", "") as PrototypeVariantId | "";
  const resolvedActive =
    activeVariant ??
    (activeFromPath && PROTOTYPE_VARIANTS.some((v) => v.id === activeFromPath)
      ? activeFromPath
      : undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-6 py-3 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
                prototype gallery · not live
              </p>
              <p className="text-sm text-muted-foreground truncate">
                Compare directions before changing the homepage
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 text-xs border rounded-md px-2.5 py-1.5 hover:bg-muted/60 transition-colors"
            >
              live site →
            </Link>
          </div>

          <nav className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
            <Link
              href="/prototype"
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                onHub ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground",
              )}
            >
              overview
            </Link>
            <span className="text-muted-foreground/40 px-1">·</span>
            <Link
              href="/"
              className="rounded-md px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              current
            </Link>
            {PROTOTYPE_VARIANTS.map((variant) => (
              <span key={variant.id} className="flex items-center">
                <span className="text-muted-foreground/40 px-1">·</span>
                <Link
                  href={`/prototype/${variant.id}`}
                  className={cn(
                    "rounded-md px-2 py-1 transition-colors",
                    resolvedActive === variant.id
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {variant.name}
                </Link>
              </span>
            ))}
            <span className="hidden sm:inline text-muted-foreground/40 px-1">·</span>
            <button
              type="button"
              onClick={toggleMode}
              className="hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Terminal className="size-3.5" />
              terminal
            </button>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <div className="flex-1 mx-auto w-full max-w-2xl px-6 py-10 sm:py-14">{children}</div>
    </div>
  );
}
