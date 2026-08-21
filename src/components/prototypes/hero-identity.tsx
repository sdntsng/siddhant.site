"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

export function HeroIdentity() {
  const [autoFlipped, setAutoFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoFlipped((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const showAlt = autoFlipped !== isHovering;

  return (
    <div className="flex flex-row gap-4 sm:gap-6 items-center">
      <Avatar
        className="size-16 sm:size-20 border border-border/80 bg-muted relative rounded-full shrink-0 cursor-pointer ring-2 ring-border/20 shadow-sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AvatarImage
          alt={DATA.name}
          src={DATA.avatarUrl}
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out absolute inset-0 size-full",
            showAlt ? "opacity-0" : "opacity-100"
          )}
        />
        <AvatarImage
          alt={DATA.name}
          src={DATA.altAvatarUrl}
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out absolute inset-0 size-full",
            showAlt ? "opacity-100" : "opacity-0"
          )}
        />
        <AvatarFallback>{DATA.initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col space-y-1 min-w-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight lowercase truncate text-foreground">
          {DATA.name.toLowerCase()}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
          {DATA.description} · based in {DATA.location.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
