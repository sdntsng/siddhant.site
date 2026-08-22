"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/data/resume";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  id: string;
  name: string;
  role: string;
  period: string;
  href?: string;
  logoUrl?: string;
  description?: string;
  category: "work" | "education";
}

export function CompactPlacesAndEducation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const experiences: ExperienceItem[] = [
    ...DATA.work.map((w: any) => ({
      id: `work-${w.company}`,
      name: String(w.company).toLowerCase(),
      role: w.title,
      period: `${String(w.start).split(" ")[1] || w.start} — ${w.end ? String(w.end).split(" ")[1] || w.end : "now"}`,
      href: w.href,
      logoUrl: w.logoUrl,
      description: w.description,
      category: "work" as const,
    })),
    {
      id: "edu-iim-indore",
      name: "iim indore",
      role: "ipm",
      period: "2015 — 2020",
      href: "https://www.iimidr.ac.in/",
      logoUrl: "/iim.png",
      description: "Integrated Programme in Management (B.A. + MBA in Management & Strategy).",
      category: "education" as const,
    },
  ];

  return (
    <div className="pt-6 border-t border-border/40 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          experience &amp; background
        </h3>
      </div>

      <div className="space-y-2">
        {experiences.map((item) => {
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(isHovered ? null : item.id)}
              className={cn(
                "group rounded-2xl p-3 sm:p-3.5 transition-all duration-200 border cursor-pointer",
                isHovered
                  ? "bg-muted/50 border-border/80 shadow-xs"
                  : "bg-transparent border-transparent hover:border-border/40 hover:bg-muted/25"
              )}
            >
              {/* Main Headline Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Logo Avatar */}
                  <div className="size-7 rounded-lg bg-muted border border-border/60 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    {item.logoUrl ? (
                      <Image
                        src={item.logoUrl}
                        alt={item.name}
                        width={28}
                        height={28}
                        className="size-full object-contain p-0.5"
                      />
                    ) : (
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">
                        {item.name[0]}
                      </span>
                    )}
                  </div>

                  {/* Title & Role */}
                  <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
                    <Link
                      href={item.href || "#"}
                      target={item.href && item.href !== "#" ? "_blank" : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className="font-medium text-foreground hover:underline inline-flex items-center gap-0.5 lowercase text-sm sm:text-[15px]"
                    >
                      {item.name}
                      {item.href && item.href !== "#" && (
                        <ArrowUpRight className="size-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                      )}
                    </Link>
                    <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
                    <span className="text-xs text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Date range & Indicator */}
                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <span className="text-[11px] font-mono text-muted-foreground/70 tabular-nums">
                    {item.period}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-3 text-muted-foreground/50 transition-transform duration-200",
                      isHovered ? "rotate-180 text-foreground" : "rotate-0"
                    )}
                  />
                </div>
              </div>

              {/* On-Hover Smooth Expand Description */}
              <AnimatePresence>
                {isHovered && item.description && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2.5 pl-10 pr-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
