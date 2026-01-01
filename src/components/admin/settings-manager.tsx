"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export function SettingsManager() {
    // State for email configuration
    const [adminEmail, setAdminEmail] = useState("");
    const [senderEmail, setSenderEmail] = useState("");

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load from localStorage on mount
        setAdminEmail(localStorage.getItem("admin_email") || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");
        setSenderEmail(localStorage.getItem("sender_email") || process.env.NEXT_PUBLIC_SENDER_EMAIL || "");
    }, []);

    const handleSave = () => {
        localStorage.setItem("admin_email", adminEmail);
        localStorage.setItem("sender_email", senderEmail);

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-1">
                    Configure your email settings. API keys are securely stored server-side.
                </p>
            </div>

            <div className="space-y-6">
                {/* Newsletter Settings */}
                <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <MailIcon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Newsletter (Plunk)</h3>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sender Email (From)</label>
                            <input
                                type="email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="hello@siddhant.site"
                                value={senderEmail}
                                onChange={(e) => setSenderEmail(e.target.value)}
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                Must be a verified sender domain in Plunk.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Admin Email (To)</label>
                            <input
                                type="email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="you@example.com"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                                Used for test emails.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                            <strong>🔒 Security Note:</strong> API keys (Plunk Secret Key, LLM API Key) and the Admin Password are now stored securely on the server. They are no longer exposed to the browser and must be configured in your Cloudflare Pages environment variables.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 w-full rounded-md bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50"
                    disabled={saved}
                >
                    {saved ? (
                        <>Saved locally!</>
                    ) : (
                        <>
                            <Save className="h-4 w-4" /> Save Configuration
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}
