import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-[400px]">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
