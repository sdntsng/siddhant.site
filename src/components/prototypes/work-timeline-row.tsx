"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { protoTypography } from "@/components/prototypes/prototype-fonts";

export function WorkTimelineRow({
  company,
  title,
  period,
  description,
  href,
}: {
  company: string;
  title: string;
  period: string;
  description?: string;
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const inner = (
    <>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <span className="font-medium">{company}</span>
          <span className="text-muted-foreground"> · {title}</span>
        </div>
        <span className={cn(protoTypography.mono, "text-[11px] text-muted-foreground shrink-0")}>
          {period}
        </span>
      </div>
      {description && (
        <p
          className={cn(
            "text-sm text-muted-foreground mt-2 overflow-hidden transition-all duration-300 ease-out",
            open ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {description}
        </p>
      )}
    </>
  );

  if (href && href !== "#") {
    return (
      <Link
        href={href}
        className="group block border-b border-border/70 py-3 last:border-0"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className="group block border-b border-border/70 py-3 last:border-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {inner}
    </div>
  );
}
