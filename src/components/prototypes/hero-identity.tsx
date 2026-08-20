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
    <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
      <Avatar
        className="size-20 sm:size-24 border bg-muted relative rounded-full shrink-0 cursor-pointer"
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

      <div className="flex flex-col space-y-1.5 flex-1">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight lowercase">
          {DATA.name.toLowerCase()}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {DATA.description} · based in {DATA.location.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
