"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MagneticWrapper from "@/components/magnetic-wrapper";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export interface ProjectItem {
  title: string;
  href?: string;
  active?: boolean;
  description: string;
  technologies: readonly string[];
  links: readonly {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
  image?: string;
  video?: string;
}

export function ProjectsCarousel({ projects }: { projects: readonly ProjectItem[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full group/carousel space-y-3">
      {/* Header controls for carousel */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground/70 tracking-tight">
          ← scroll / drag to explore →
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 rounded-lg border border-border/70 bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 rounded-lg border border-border/70 bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-[280px] sm:w-[310px] flex-none snap-start"
          >
            <MagneticWrapper strength={0.12}>
              <Card className="group flex flex-col justify-between overflow-hidden border border-border/80 hover:border-foreground/30 hover:shadow-lg transition-all duration-300 ease-out h-[380px] bg-card/60 backdrop-blur-sm rounded-2xl">
                {/* Top Media & Content Area */}
                <div className="flex flex-col">
                  {/* Media Banner */}
                  <Link href={project.href || "#"} target="_blank" className="block cursor-pointer relative overflow-hidden">
                    {project.video && (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="pointer-events-none mx-auto h-36 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {project.image && (
                      <div className="h-36 w-full overflow-hidden relative bg-muted/40">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    {project.active && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-foreground font-medium shadow-xs">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          active
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Title & Description with proper breathing room */}
                  <CardHeader className="px-4 pt-3.5 pb-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold lowercase tracking-tight">
                          {project.title.toLowerCase()}
                        </CardTitle>
                        <ArrowUpRight className="size-3.5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3 leading-relaxed">
                        {project.description}
                      </Markdown>
                    </div>
                  </CardHeader>
                </div>

                {/* Bottom Tags & Links Area */}
                <div className="flex flex-col mt-auto">
                  <CardContent className="px-4 py-2">
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tag) => (
                          <Badge
                            className="px-1.5 py-0 text-[10px] font-mono lowercase bg-muted/70 hover:bg-muted text-muted-foreground font-normal border-border/40"
                            variant="secondary"
                            key={tag}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="px-4 pb-3.5 pt-2 border-t border-border/40">
                    {project.links && project.links.length > 0 && (
                      <div className="flex flex-row flex-wrap items-center gap-1.5">
                        {project.links.map((link, idx) => (
                          <Link href={link.href} key={idx} target="_blank">
                            <Badge
                              key={idx}
                              variant="outline"
                              className="flex gap-1.5 px-2.5 py-0.5 text-[10px] lowercase font-sans hover:bg-accent transition-colors font-medium border-border/60"
                            >
                              {link.icon}
                              {link.type}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardFooter>
                </div>
              </Card>
            </MagneticWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
