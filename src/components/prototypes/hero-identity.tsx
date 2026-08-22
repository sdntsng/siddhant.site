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
    <div className="flex flex-row gap-3.5 sm:gap-5 items-center">
      <Avatar
        className="size-14 sm:size-16 border border-border/80 bg-muted relative rounded-full shrink-0 cursor-pointer ring-1 ring-border/30 shadow-xs"
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

      <div className="flex flex-col space-y-0.5 min-w-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight lowercase truncate text-foreground">
          {DATA.name.toLowerCase()}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
          {DATA.description} · based in {DATA.location.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
