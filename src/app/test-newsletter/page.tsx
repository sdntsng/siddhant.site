"use client";

import { NewsletterPopup } from "@/components/newsletter-popup";

export default function NewsletterTestPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-neutral-100 dark:bg-neutral-900">
            <div className="max-w-md space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tighter">Newsletter UI Test</h1>
                <p className="text-muted-foreground">
                    The popup should appear in the bottom right corner after 3 seconds.
                </p>
                <div className="p-4 bg-background border rounded-lg text-sm text-left">
                    <p className="font-mono text-xs mb-2 text-muted-foreground">Debug Controls</p>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                            localStorage.removeItem("newsletter-dismissed");
                            localStorage.removeItem("newsletter-subscribed");
                            window.location.reload();
                        }}
                    >
                        Reset LocalStorage & Reload
                    </button>
                </div>
            </div>
            <NewsletterPopup />
        </div>
    );
}
