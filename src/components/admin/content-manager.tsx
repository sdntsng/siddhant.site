"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { FileText, Mail, Share2, Sparkles, Send, Calendar, Clock, Users, Globe, Rocket, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import juice from "juice";

type Post = {
    slug: string;
    source: string;
    metadata: {
        title: string;
        publishedAt: string;
        summary: string;
        image?: string;
    };
};

export function ContentManager({ posts }: { posts: Post[] }) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [activeTab, setActiveTab] = useState<"email" | "social">("email");

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] gap-4 md:gap-6">
            {/* Left: Post List */}
            <div className={`
                md:w-1/3 border border-border rounded-xl bg-card overflow-hidden flex flex-col shadow-sm
                ${selectedPost ? 'hidden md:flex' : 'flex h-full'}
            `}>
                <div className="p-4 border-b border-border bg-muted/30">
                    <h2 className="font-semibold flex items-center gap-2 text-sm md:text-base">
                        <FileText className="h-4 w-4" />
                        Posts ({posts.length})
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {posts.map((post) => (
                        <button
                            key={post.slug}
                            onClick={() => setSelectedPost(post)}
                            className={cn(
                                "w-full text-left p-3 rounded-lg text-sm transition-all border",
                                selectedPost?.slug === post.slug
                                    ? "bg-primary/5 border-primary/20 ring-1 ring-primary/20"
                                    : "hover:bg-accent border-transparent"
                            )}
                        >
                            <h3 className="font-medium truncate">{post.metadata.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(post.metadata.publishedAt), "MMM d, yyyy")}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Work Area */}
            <div className={`
                flex-1 border border-border rounded-xl bg-card overflow-hidden flex-col relative shadow-sm
                ${selectedPost ? 'flex h-full' : 'hidden md:flex'}
            `}>
                {!selectedPost ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-slate-50/50 dark:bg-black/50">
                        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-4">
                            <FileText className="h-6 w-6 opacity-50" />
                        </div>
                        <p>Select a post from the list to start.</p>
                    </div>
                ) : (
                    <>
                        {/* Toolbar */}
                        <div className="p-2 border-b border-border bg-muted/30 flex items-center gap-2 flex-wrap md:flex-nowrap">
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="md:hidden mr-2 p-1.5 hover:bg-muted rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>

                            <div className="flex p-1 bg-background rounded-lg border border-border shadow-sm">
                                <button
                                    onClick={() => setActiveTab("email")}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition-all",
                                        activeTab === "email" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    Newsletter
                                </button>
                                <button
                                    onClick={() => setActiveTab("social")}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition-all",
                                        activeTab === "social" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                    Socials
                                </button>
                            </div>
                            <div className="ml-auto flex items-center gap-2 min-w-0">
                                <span className="text-xs text-muted-foreground truncate max-w-[150px] md:max-w-[300px]">
                                    {selectedPost.metadata.title}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950/50">
                            {activeTab === "email" ? (
                                <NewsletterGenerator post={selectedPost} />
                            ) : (
                                <SocialGenerator post={selectedPost} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const TIMEZONES = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Singapore",
    "Australia/Sydney",
];

function NewsletterGenerator({ post }: { post: Post }) {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    // Scheduling & Targeting
    const [mode, setMode] = useState<"test" | "burst">("test"); // Test vs Burst
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleTime, setScheduleTime] = useState("");
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Segments & Counts
    const [segments, setSegments] = useState<{ id: string, name: string, memberCount?: number }[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<string>("");
    const [totalContacts, setTotalContacts] = useState<number | null>(null);

    useEffect(() => {
        // Fetch segments on mount
        const fetchMetadata = async () => {
            try {
                // 1. Fetch Segments
                const segRes = await fetch("/api/admin/plunk/segments", {
                    credentials: "include",
                });
                if (segRes.ok) {
                    const data = await segRes.json();
                    const items = Array.isArray(data) ? data : (data.items || []);
                    setSegments(items);
                }

                // 2. Fetch Total Contacts Count
                const contactsRes = await fetch("/api/admin/plunk/contacts?limit=1", {
                    credentials: "include",
                });
                if (contactsRes.ok) {
                    const data = await contactsRes.json();
                    if (data.meta && typeof data.meta.total === 'number') {
                        setTotalContacts(data.meta.total);
                    } else if (typeof data.total === 'number') {
                        setTotalContacts(data.total); // Some API versions returns 'total' at root
                    }
                }

            } catch (e) { console.error("Failed to fetch Plunk metadata", e); }
        }
        fetchMetadata();
    }, []);



    const generateEmail = async () => {
        setLoading(true);
        setError("");
        try {
            const templateRes = await fetch("/newsletter-template.html");
            if (!templateRes.ok) throw new Error("Could not load template file.");
            const template = await templateRes.text();

            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(post.source);

            const contentHtml = String(file);
            const filledTemplate = template
                .replace("{{title}}", post.metadata.title)
                .replace("{{content}}", contentHtml)
                .replace("{{unsubscribe_url}}", "{{unsubscribe_link}}"); // Plunk replacement tag

            try {
                const inlined = juice(filledTemplate);
                setHtml(inlined);
            } catch (e) {
                setHtml(filledTemplate);
            }

        } catch (err: any) {
            setError(err.message || "Failed to generate email");
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        setSending(true);
        setStatus("");
        setError("");

        const adminEmail = localStorage.getItem("admin_email") || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const senderEmail = localStorage.getItem("sender_email") || process.env.NEXT_PUBLIC_SENDER_EMAIL;

        if (!senderEmail) {
            setError("Missing Configuration. Check Settings.");
            setSending(false);
            return;
        }

        try {
            // 1. Calculate Delay (if scheduled)
            let delay: number | undefined = undefined;
            if (showSchedule && scheduleTime) {
                // Parse the datetime-local value as if it's in the selected timezone
                // datetime-local returns a string like "2024-01-15T14:30" without timezone info
                // We need to interpret this as being in the selected timezone, not the browser's local timezone
                const zonedDate = toZonedTime(scheduleTime, timezone);
                const targetTime = zonedDate.getTime();
                const now = Date.now();
                const diffSeconds = Math.floor((targetTime - now) / 1000);

                if (diffSeconds <= 0) {
                    setError("Scheduled time must be in the future.");
                    setSending(false);
                    return;
                }
                delay = diffSeconds;
            }

            if (mode === "test") {
                // Transactional Test Send
                if (!adminEmail) {
                    setError("Admin Email missing in Settings.");
                    setSending(false);
                    return;
                }
                const res = await fetch("/api/plunk/v1/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        to: adminEmail,
                        from: senderEmail,
                        subject: `[TEST] ${post.metadata.title}`,
                        body: html,
                        ...(delay ? { delay } : {})
                    })
                });
                if (!res.ok) throw await getError(res);
                setStatus("Test Email Sent!");

            } else {
                // Burst / Campaign Mode
                // 1. Create Campaign
                const createRes = await fetch("/api/admin/plunk/campaigns", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: post.metadata.title,
                        subject: post.metadata.title,
                        body: html,
                        from: senderEmail,
                        audienceType: selectedSegment ? "SEGMENT" : "ALL",
                        segmentId: selectedSegment ? selectedSegment : undefined,
                    })
                });

                if (!createRes.ok) throw await getError(createRes);
                const campaign = await createRes.json();

                // 2. Send/Schedule Campaign (using the new ID)
                const campaignId = campaign.id || (campaign.data && campaign.data.id);

                if (!campaignId) throw new Error("Could not create campaign ID");

                const sendRes = await fetch(`/api/admin/plunk/campaigns/${campaignId}/send`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...(delay ? { delay } : {}) // Send immediately if no delay
                    })
                });

                if (!sendRes.ok) throw await getError(sendRes);
                setStatus(delay ? "Campaign Scheduled!" : "Campaign Sent!");
            }

            if (!delay) setTimeout(() => setStatus(""), 3000);

        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    const getError = async (res: Response) => {
        try {
            const json = await res.json();
            const errorMsg = json.message || json.error?.message || "API Error";
            const details = json.error?.errors?.map((e: any) => `${e.field}: ${e.message}`).join(", ");
            return new Error(details ? `${errorMsg} (${details})` : errorMsg);
        } catch {
            return new Error(res.statusText);
        }
    }

    return (
        <div className="h-full flex flex-col gap-4">
            {!html ? (
                <div className="flex flex-col h-full items-center justify-center text-center space-y-4">
                    <div className="h-12 w-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Generate Email Draft</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                            Convert &quot;{post.metadata.title}&quot; into an email-ready HTML draft.
                        </p>
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                        onClick={generateEmail}
                        disabled={loading}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center gap-2 shadow-sm transition-all"
                    >
                        {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Sparkles className="h-4 w-4" />}
                        Generate Preview
                    </button>
                </div>
            ) : (
                <div className="flex flex-col h-full gap-4">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-3 p-3 bg-muted/20 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Send Configuration</h3>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setMode("test")}
                                    className={cn("px-3 py-1 text-xs rounded-md transition-colors font-medium border", mode === "test" ? "bg-white border-border shadow-sm text-foreground" : "border-transparent text-muted-foreground hover:bg-muted")}
                                >
                                    Test
                                </button>
                                <button
                                    onClick={() => setMode("burst")}
                                    className={cn("px-3 py-1 text-xs rounded-md transition-colors font-medium border flex items-center gap-1", mode === "burst" ? "bg-blue-50 border-blue-100 text-blue-600 shadow-sm" : "border-transparent text-muted-foreground hover:bg-muted")}
                                >
                                    <Rocket className="h-3 w-3" /> Burst
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Schedule Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowSchedule(!showSchedule)}
                                    className={cn(
                                        "p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors border border-transparent",
                                        showSchedule && "bg-white border-border shadow-sm text-foreground"
                                    )}
                                    title="Schedule Send"
                                >
                                    <Clock className="h-4 w-4" />
                                </button>
                                {showSchedule && (
                                    <>
                                        <input
                                            type="datetime-local"
                                            className="px-2 py-1.5 text-xs border rounded-md"
                                            value={scheduleTime}
                                            onChange={(e) => setScheduleTime(e.target.value)}
                                        />
                                        <div className="relative">
                                            <Globe className="h-3 w-3 absolute left-2 top-2 text-muted-foreground" />
                                            <select
                                                className="pl-6 pr-2 py-1.5 text-xs border rounded-md bg-transparent max-w-[100px]"
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                            >
                                                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            {mode === "burst" && (
                                <div className="flex items-center gap-2 border-l pl-3 border-border">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <select
                                        className="text-xs border rounded-md px-2 py-1.5 bg-background min-w-[160px]"
                                        value={selectedSegment}
                                        onChange={(e) => setSelectedSegment(e.target.value)}
                                    >
                                        <option value="">All Contacts {totalContacts !== null ? `(${totalContacts})` : ''}</option>
                                        {segments.map(s => <option key={s.id} value={s.id}>{s.name} {s.memberCount !== undefined ? `(${s.memberCount})` : ''}</option>)}
                                    </select>
                                </div>
                            )}

                            <div className="ml-auto flex items-center gap-2">
                                {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
                                {status && <span className="text-xs text-green-600 font-medium">{status}</span>}

                                <button
                                    onClick={handleSend}
                                    disabled={sending}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap text-white transition-all",
                                        mode === "test" ? "bg-zinc-800 hover:bg-zinc-700" : "bg-blue-600 hover:bg-blue-500"
                                    )}
                                >
                                    {sending ? <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" /> : (showSchedule ? <Calendar className="h-3 w-3" /> : <Send className="h-3 w-3" />)}
                                    {showSchedule ? "Schedule" : (mode === "burst" ? "Send Burst" : "Send Test")}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 border border-border rounded-lg bg-white overflow-hidden relative shadow-sm">
                        <iframe
                            srcDoc={html}
                            className="w-full h-full absolute inset-0"
                            title="Email Preview"
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function SocialGenerator({ post }: { post: Post }) {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="text-center space-y-4">
                <div className="h-12 w-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">AI Social Remix</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                        Use LLMs to turn this essay into a viral X thread and LinkedIn post.
                    </p>
                </div>
                <button disabled className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed">
                    Generate with AI (Coming Soon)
                </button>
            </div>
        </div>
    )
}
