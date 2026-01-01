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

    // Show popup after a delay, checking localStorage
    useEffect(() => {
        const isDismissed = localStorage.getItem("newsletter-dismissed");
        const isSubscribed = localStorage.getItem("newsletter-subscribed");

        // Only show if the user hasn't successfully subscribed in this session (via state)
        // and hasn't invalidating local storage flags
        if (!isDismissed && !isSubscribed && !state.success) {
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
        localStorage.setItem("newsletter-dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
                >
                    <div className="bg-background/80 backdrop-blur-md border border-border shadow-lg rounded-xl p-6 m-4 relative overflow-hidden">
                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {!state.success ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg tracking-tight">Stay in the loop</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Get updates on my latest thoughts on AI, design, and tech. No spam, just signal.
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
                                    <p className="text-xs text-red-500">{state.message}</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4 space-y-3 text-center">
                                <div className="h-10 w-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                    <Check size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium">You're on the list!</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Keep an eye on your inbox.</p>
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
