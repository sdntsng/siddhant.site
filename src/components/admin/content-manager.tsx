"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileText, Mail, Share2, Sparkles, Send, Calendar, Clock } from "lucide-react";
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

function NewsletterGenerator({ post }: { post: Post }) {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    // Scheduling State
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleTime, setScheduleTime] = useState("");

    const generateEmail = async () => {
        setLoading(true);
        setError("");
        try {
            // 1. Fetch template
            const templateRes = await fetch("/newsletter-template.html");
            if (!templateRes.ok) throw new Error("Could not load template file. Make sure it is in public/");
            const template = await templateRes.text();

            // 2. Convert Markdown to HTML
            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(post.source);

            const contentHtml = String(file);

            // 3. Inject into template
            const filledTemplate = template
                .replace("{{title}}", post.metadata.title)
                .replace("{{content}}", contentHtml)
                .replace("{{unsubscribe_url}}", "#");

            // 4. Inline CSS
            try {
                const inlined = juice(filledTemplate);
                setHtml(inlined);
            } catch (e) {
                console.warn("Juice inlining failed, using raw HTML", e);
                setHtml(filledTemplate);
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate email");
        } finally {
            setLoading(false);
        }
    };

    const sendTest = async () => {
        setSending(true);
        setStatus("");
        setError("");

        const plunkKey = localStorage.getItem("plunk_secret_key");
        const adminEmail = localStorage.getItem("admin_email");
        const senderEmail = localStorage.getItem("sender_email");

        if (!plunkKey || !adminEmail || !senderEmail) {
            setError("Configure Plunk keys and Sender Email in Settings first.");
            setSending(false);
            return;
        }

        try {
            // Calculate delay if scheduled
            let delay = undefined;
            if (showSchedule && scheduleTime) {
                const targetTime = new Date(scheduleTime).getTime();
                const now = Date.now();
                const diffSeconds = Math.floor((targetTime - now) / 1000);

                if (diffSeconds <= 0) {
                    setError("Scheduled time must be in the future.");
                    setSending(false);
                    return;
                }
                delay = diffSeconds;
            }

            const res = await fetch("https://next-api.useplunk.com/v1/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${plunkKey}`
                },
                body: JSON.stringify({
                    to: adminEmail,
                    from: senderEmail,
                    subject: `[${delay ? "Scheduled" : "Test"}] ${post.metadata.title}`,
                    body: html,
                    ...(delay ? { delay } : {})
                })
            });

            if (!res.ok) {
                // Try to parse JSON error first, fallback to text
                try {
                    const errData = await res.json();
                    throw new Error(errData.message || JSON.stringify(errData));
                } catch (e: any) {
                    if (e.message && e.message !== "Unexpected end of JSON input") throw e;
                    const errText = await res.text();
                    throw new Error(errText || res.statusText);
                }
            }

            setStatus(delay ? `Scheduled for ${new Date(scheduleTime).toLocaleString()}` : "Sent!");
            if (!delay) setTimeout(() => setStatus(""), 3000);
        } catch (err: any) {
            console.error(err);
            setError("Send failed: " + err.message);
        } finally {
            setSending(false);
        }
    };

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
                            Convert "{post.metadata.title}" into an email-ready HTML draft.
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h3 className="font-medium text-sm">Preview</h3>
                        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                            {error && <span className="text-xs text-red-500 mr-2 whitespace-nowrap">{error}</span>}
                            {status && <span className="text-xs text-green-500 font-medium mr-2 whitespace-nowrap">{status}</span>}

                            <button onClick={() => setHtml("")} className="text-xs text-muted-foreground hover:text-foreground whitespace-nowrap">
                                Reset
                            </button>

                            {/* Schedule Toggle */}
                            <button
                                onClick={() => setShowSchedule(!showSchedule)}
                                className={cn(
                                    "p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors",
                                    showSchedule && "bg-secondary text-foreground"
                                )}
                                title="Schedule Send"
                            >
                                <Calendar className="h-4 w-4" />
                            </button>

                            {showSchedule && (
                                <input
                                    type="datetime-local"
                                    className="px-2 py-1 text-xs border rounded-md"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                />
                            )}

                            <button
                                onClick={sendTest}
                                disabled={sending}
                                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                            >
                                {sending ? <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" /> : (showSchedule ? <Clock className="h-3 w-3" /> : <Send className="h-3 w-3" />)}
                                {showSchedule ? "Schedule" : "Send Test"}
                            </button>
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
