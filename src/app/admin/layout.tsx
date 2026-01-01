"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from "lucide-react";
import { AuthGuard } from "@/components/admin/auth-guard";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Content",
        href: "/admin/content",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("admin_authenticated");
        window.location.reload();
    };

    return (
        <AuthGuard>
            <div className="flex h-screen bg-background relative overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden absolute top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-4 z-20">
                    <h1 className="font-bold">Admin Portal</h1>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground">
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Sidebar (Desktop + Mobile Overlay) */}
                <aside className={cn(
                    "fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transition-transform transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="p-6 hidden md:block">
                        <h1 className="text-xl font-bold tracking-tight">Admin Portal</h1>
                        <p className="text-xs text-muted-foreground">siddhant.site</p>
                    </div>

                    {/* Spacer for mobile header */}
                    <div className="h-16 md:hidden" />

                    <nav className="flex-1 px-4 space-y-1 p-4 md:p-0">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-border">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-black">
                    {/* Padding top on mobile to clear header */}
                    <div className="h-full pt-16 md:pt-0 p-4 md:p-8 max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Mobile Backdrop */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </AuthGuard>
    );
}
