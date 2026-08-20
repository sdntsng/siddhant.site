import { Source_Sans_3, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-proto-display",
  weight: ["400", "600"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-proto-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-proto-mono",
  weight: ["400", "500"],
});

export function PrototypeFontScope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        display.variable,
        body.variable,
        mono.variable,
        "[font-family:var(--font-proto-body),ui-sans-serif,system-ui,sans-serif]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const protoTypography = {
  display: "font-[family-name:var(--font-proto-display)]",
  body: "font-[family-name:var(--font-proto-body)]",
  mono: "font-[family-name:var(--font-proto-mono)]",
};
