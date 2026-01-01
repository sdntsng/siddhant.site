import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back. Manage your content and distribution engines here.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Action Card: Content */}
                <Link
                    href="/admin/content"
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Manage Content</h3>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Generate newsletters and social posts from your MDX files.
                    </p>
                </Link>

                {/* Quick Action Card: Settings */}
                <Link
                    href="/admin/settings"
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Settings</h3>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Configure LLM keys, Plunk API keys, and other secrets.
                    </p>
                </Link>
            </div>
        </div>
    );
}
