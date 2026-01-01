"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";

// Submit Button Component to handle pending state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </button>
    );
}

const initialState = {
    success: false,
    message: "",
};

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, formAction] = useFormState(subscribeToNewsletter, initialState);

    // Exposy a way to open the popup globally
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
        if ((!dismissedAt || isDismissedExpired) && !isSubscribed && !state.success) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state.success]);

    // Handle success state
    useEffect(() => {
        if (state.success) {
            localStorage.setItem("newsletter-subscribed", "true");
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state.success]);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem("newsletter-dismissed", Date.now().toString());
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

                        {!state.success ? (
                            <div className="space-y-4">
                                <div className="space-y-2 text-center">
                                    <h3 className="font-semibold text-lg tracking-tight">join the list</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        thoughtful notes on ai, design, and engineering. no spam, just signal.
                                    </p>
                                </div>

                                <form action={formAction} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="siddhant@example.com"
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-secondary/50 border border-transparent focus:border-primary rounded-md outline-none transition-all placeholder:text-muted-foreground/70"
                                        />
                                    </div>
                                    <SubmitButton />
                                </form>
                                {state.message && !state.success && (
                                    <p className="text-xs text-red-500 text-center">{state.message}</p>
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
