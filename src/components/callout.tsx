import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CalloutProps {
    children?: ReactNode;
    emoji?: string;
    className?: string;
    title?: string;
    description?: string;
}

export function Callout({
    children,
    emoji = "💡",
    className,
    title = "Gyan",
    description,
}: CalloutProps) {
    // Default description for "Gyan" if not explicitly provided
    const finalDescription =
        description ||
        (title === "Gyan"
            ? "Gyan is a short, single-line takeaway in the blog, just in case you're breezing through the long read"
            : undefined);

    return (
        <div
            className={cn(
                "my-6 flex items-start rounded-md border border-l-4 border-l-primary bg-neutral-100 p-4 dark:bg-neutral-900 dark:border-l-primary/50",
                className
            )}
        >
            <div className="mr-4 text-2xl select-none">{emoji}</div>
            <div className="w-full min-w-0">
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h5
                                className={cn(
                                    "mb-1 font-bold leading-none tracking-tight w-fit flex items-center gap-1",
                                    finalDescription && "cursor-help decoration-dotted underline underline-offset-4 decoration-neutral-400"
                                )}
                            >
                                {title}
                            </h5>
                        </TooltipTrigger>
                        {finalDescription && (
                            <TooltipContent className="max-w-xs text-center">
                                <p>{finalDescription}</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
                <div className="text-sm text-muted-foreground [&>p]:m-0 [&>p]:leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
