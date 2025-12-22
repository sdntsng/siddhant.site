"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type UIMode = "gui" | "terminal";

interface TerminalContextType {
    mode: UIMode;
    toggleMode: () => void;
    setMode: (mode: UIMode) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<UIMode>("gui");

    const toggleMode = () => {
        setMode((prev) => (prev === "gui" ? "terminal" : "gui"));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggleMode();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <TerminalContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </TerminalContext.Provider>
    );
}

export function useTerminal() {
    const context = useContext(TerminalContext);
    if (context === undefined) {
        throw new Error("useTerminal must be used within a TerminalProvider");
    }
    return context;
}
