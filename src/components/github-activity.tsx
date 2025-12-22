"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
    () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
    { ssr: false }
);

export default function GithubActivity() {
    const { theme } = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollLeft = ref.current.scrollWidth;
        }
    }, []);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center w-full mx-auto overflow-x-auto scrollbar-hide">
            <div className="min-w-fit">
                <GitHubCalendar
                    username="sdntsng"
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    colorScheme={theme === "dark" ? "light" : "light"} // We can adjust this
                    style={{
                        color: theme === "dark" ? "white" : "black",
                    }}
                    labels={{
                        legend: {
                            less: "Less",
                            more: "More",
                        },
                        months: [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ],
                        totalCount: "{{count}} commits in the last year",
                        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    }}
                />
            </div>
        </div>
    );
}
