import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-2xl mx-auto py-12 sm:py-24 px-6 min-h-screen">
            {children}
            <Navbar />
        </div>
    );
}
