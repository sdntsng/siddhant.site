import Link from "next/link";
import { DATA } from "@/data/resume";

export function ContactSection() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      <Link
        href={DATA.contact.social.X.url}
        target="_blank"
        className="text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-4"
      >
        x (@{DATA.contact.social.X.url.split("/").pop()})
      </Link>
      <Link
        href={DATA.contact.social.GitHub.url}
        target="_blank"
        className="text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-4"
      >
        github
      </Link>
      <Link
        href={DATA.contact.social.LinkedIn.url}
        target="_blank"
        className="text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-4"
      >
        linkedin
      </Link>
      <Link
        href="/meet"
        className="text-muted-foreground hover:text-foreground transition-colors lowercase underline underline-offset-4"
      >
        book a session
      </Link>
      <a
        href={`mailto:${DATA.contact.email}`}
        className="text-muted-foreground hover:text-foreground transition-colors lowercase font-mono text-xs"
      >
        {DATA.contact.email}
      </a>
    </div>
  );
}
