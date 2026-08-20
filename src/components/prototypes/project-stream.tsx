import Link from "next/link";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Github } from "lucide-react";

export function ProjectStream() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {DATA.projects.map((p) => {
        const websiteLink = p.links.find((l) => l.type === "Website")?.href || p.href;
        const sourceLink = p.links.find((l) => l.type === "Source")?.href;

        return (
          <div
            key={p.title}
            className="group flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href={websiteLink}
                  target="_blank"
                  className="font-medium tracking-tight text-foreground hover:underline inline-flex items-center gap-1 lowercase text-base"
                >
                  {p.title.toLowerCase()}
                  <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                {sourceLink && (
                  <Link
                    href={sourceLink}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="View source"
                  >
                    <Github className="size-3.5" />
                  </Link>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
              {p.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono text-muted-foreground/80 bg-background/60 px-1.5 py-0.5 rounded"
                >
                  {tech.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
