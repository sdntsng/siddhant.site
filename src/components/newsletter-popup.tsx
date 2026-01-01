"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Check, Loader2 } from "lucide-react";
import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email(),
});

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    // Expose a way to open the popup globally
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-newsletter", handleOpen);
        return () => window.removeEventListener("open-newsletter", handleOpen);
    }, []);

    // Show popup after a delay, checking localStorage with expiration
    useEffect(() => {
        const dismissedAt = localStorage.getItem("newsletter-dismissed");
        const isSubscribed = localStorage.getItem("newsletter-subscribed");

        // Check if dismissal is expired (older than 30 days)
        let isDismissedExpired = false;
        if (dismissedAt) {
            const dismissedDate = parseInt(dismissedAt, 10);
            const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
            if (Date.now() - dismissedDate > thirtyDaysInMs) {
                isDismissedExpired = true;
            }
        }

        // Only show if:
        // 1. Not subscribed
        // 2. Not dismissed OR dismissed but expired
        // 3. Not successfully subscribed in current session
        if ((!dismissedAt || isDismissedExpired) && !isSubscribed && !success) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Handle success state
    useEffect(() => {
        if (success) {
            localStorage.setItem("newsletter-subscribed", "true");
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem("newsletter-dismissed", Date.now().toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const result = subscribeSchema.safeParse({ email });

        if (!result.success) {
            setMessage("Invalid email address");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://next-api.useplunk.com/v1/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLUNK_PUBLIC_KEY}`,
                },
                body: JSON.stringify({
                    event: "newsletter-subscribe",
                    email: result.data.email,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Plunk API Error:", errorData);
                setMessage("Failed to subscribe. Please try again.");
                setLoading(false);
                return;
            }

            setSuccess(true);
            setMessage("Subscribed successfully!");
        } catch (error) {
            console.error("Subscription error:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 50, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: 50, opacity: 0, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-[15%] left-1/2 z-50 w-full max-w-sm -translate-x-1/2"
                >
                    <div className="bg-background/80 backdrop-blur-md border border-border shadow-2xl rounded-xl p-6 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {!success ? (
                            <div className="space-y-4">
                                <div className="space-y-2 text-center">
                                    <h3 className="font-semibold text-lg tracking-tight">join the list</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Get updates whenever I write something new
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="siddhant@example.com"
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-secondary/50 border border-transparent focus:border-primary rounded-md outline-none transition-all placeholder:text-muted-foreground/70"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
                                    </button>
                                </form>
                                {message && !success && (
                                    <p className="text-xs text-red-500 text-center">{message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4 space-y-3 text-center">
                                <div className="h-10 w-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                    <Check size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium">you&apos;re on the list.</h3>
                                    <p className="text-xs text-muted-foreground mt-1">talk soon.</p>
                                </div>
                            </div>
                        )}

                        {/* Decorational gradient */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-50" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
