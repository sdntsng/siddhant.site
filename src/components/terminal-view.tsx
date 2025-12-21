"use client";

import React, { useState, useEffect, useRef } from "react";
import { DATA } from "@/data/resume";
import { motion } from "framer-motion";

export default function TerminalView() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "SiddhantOS v1.0.0 (type 'help' for commands)",
        "",
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, () => void> = {
        help: () => {
            setHistory((prev) => [
                ...prev,
                "Available commands:",
                "  whoami    - About me",
                "  ls        - List sections",
                "  cat       - View section content (e.g. cat work)",
                "  clear     - Clear terminal",
                "  gui       - Switch to GUI mode",
                "",
            ]);
        },
        whoami: () => {
            setHistory((prev) => [
                ...prev,
                `${DATA.name} - ${DATA.description}`,
                "",
            ]);
        },
        ls: () => {
            setHistory((prev) => [
                ...prev,
                "sections:",
                "  about",
                "  work",
                "  interests",
                "  projects",
                "  contact",
                "",
            ]);
        },
        clear: () => setHistory([]),
        gui: () => {
            // This will be handled by the parent
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
        },
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim().toLowerCase();
        const [cmd, ...args] = trimmedInput.split(" ");

        setHistory((prev) => [...prev, `> ${input}`]);

        if (commands[cmd]) {
            commands[cmd]();
        } else if (cmd === "cat") {
            const section = args[0];
            if (section === "about") {
                setHistory((prev) => [...prev, DATA.summary, ""]);
            } else if (section === "work") {
                DATA.work.forEach((w) => {
                    setHistory((prev) => [
                        ...prev,
                        `[${w.company}] ${w.title} (${w.start} - ${w.end || "Present"})`,
                        w.description,
                        "",
                    ]);
                });
            } else if (section === "interests") {
                setHistory((prev) => [...prev, DATA.Interests.join(", "), ""]);
            } else if (section === "projects") {
                DATA.projects.forEach((p) => {
                    setHistory((prev) => [
                        ...prev,
                        `[${p.title}] ${p.description}`,
                        `Stack: ${p.technologies.join(", ")}`,
                        "",
                    ]);
                });
            } else if (section === "contact") {
                setHistory((prev) => [...prev, `Email: ${DATA.contact.email}`, `X: ${DATA.contact.social.X.url}`, ""]);
            } else {
                setHistory((prev) => [...prev, `Error: Section '${section}' not found.`, ""]);
            }
        } else if (trimmedInput !== "") {
            setHistory((prev) => [...prev, `Command not found: ${cmd}. Type 'help' for assistance.`, ""]);
        }

        setInput("");
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] text-[#00ff00] font-mono p-4 overflow-y-auto selection:bg-[#00ff00] selection:text-[#0a0a0a]"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="max-w-3xl mx-auto space-y-1">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">
                        {line}
                    </div>
                ))}
                <form onSubmit={handleCommand} className="flex">
                    <span className="mr-2 underline">sid@site:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-[#00ff00]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                </form>
                <div ref={bottomRef} className="h-4" />
            </div>
            <div className="fixed bottom-4 right-4 text-xs opacity-50">
                Press Cmd+K to exit
            </div>
        </motion.div>
    );
}
