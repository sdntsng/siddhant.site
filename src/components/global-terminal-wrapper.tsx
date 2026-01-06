"use client";

import React from "react";
import { useTerminal } from "@/context/terminal";
import TerminalView from "@/components/terminal-view";

export default function GlobalTerminalWrapper({ children }: { children: React.ReactNode }) {
    const { mode } = useTerminal();

    if (mode === "terminal") {
        return <TerminalView />;
    }

    return <>{children}</>;
}
