"use client";

import { Mail } from "lucide-react";

export function NewsletterTrigger() {
    return (
        <button
            onClick={() => window.dispatchEvent(new Event("open-newsletter"))}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors ml-4 px-2 py-1 rounded-md hover:bg-secondary/50 group"
        >
            <Mail className="size-3 group-hover:text-primary transition-colors" />
            <span>subscribe</span>
        </button>
    );
}
