import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import MagneticWrapper from "@/components/magnetic-wrapper";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <MagneticWrapper strength={0.2}>
      <Card
        className={cn(
          "group flex flex-col overflow-hidden border hover:shadow-xl transition-all duration-500 ease-out h-full bg-background/50 backdrop-blur-sm",
          className
        )}
      >
        <Link
          href={href || "#"}
          className="block cursor-pointer"
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <CardHeader className="px-3 py-2">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base lowercase italic">{title}</CardTitle>
            <time className="font-sans text-[10px] opacity-60">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-3 py-2">
          {tags && tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px] font-mono lowercase"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-3 pb-3 pt-0">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-1.5 px-2 py-0.5 text-[10px] lowercase italic">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </MagneticWrapper>
  );
}
