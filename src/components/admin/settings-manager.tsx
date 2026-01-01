"use client";

import { useState, useEffect } from "react";
import { Save, Key, Globe, Database, Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function SettingsManager() {
    // State for keys
    const [plunkKey, setPlunkKey] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [senderEmail, setSenderEmail] = useState("");

    // State for Universal LLM
    const [llmBaseUrl, setLlmBaseUrl] = useState("https://api.openai.com/v1");
    const [llmApiKey, setLlmApiKey] = useState("");
    const [llmModelId, setLlmModelId] = useState("gpt-4o");
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [fetchingModels, setFetchingModels] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load from localStorage on mount
        setPlunkKey(localStorage.getItem("plunk_secret_key") || process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY || "");
        setAdminEmail(localStorage.getItem("admin_email") || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");
        setSenderEmail(localStorage.getItem("sender_email") || process.env.NEXT_PUBLIC_SENDER_EMAIL || "");
        setLlmBaseUrl(localStorage.getItem("llm_base_url") || process.env.NEXT_PUBLIC_LLM_BASE_URL || "https://api.openai.com/v1");
        setLlmApiKey(localStorage.getItem("llm_api_key") || process.env.NEXT_PUBLIC_LLM_API_KEY || "");
        setLlmModelId(localStorage.getItem("llm_model_id") || process.env.NEXT_PUBLIC_LLM_MODEL_ID || "gpt-4o");
    }, []);

    const handleSave = () => {
        localStorage.setItem("plunk_secret_key", plunkKey);
        localStorage.setItem("admin_email", adminEmail);
        localStorage.setItem("sender_email", senderEmail);
        localStorage.setItem("llm_base_url", llmBaseUrl);
        localStorage.setItem("llm_api_key", llmApiKey);
        localStorage.setItem("llm_model_id", llmModelId);

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const fetchModels = async () => {
        if (!llmBaseUrl || !llmApiKey) {
            setStatusMessage("Base URL and API Key are required.");
            setConnectionStatus("error");
            return;
        }

        setFetchingModels(true);
        setConnectionStatus("idle");
        setStatusMessage("");

        try {
            // Construct standard OpenAI compatible /models endpoint
            // Handle trailing slash if present
            const baseUrl = llmBaseUrl.replace(/\/+$/, "");
            const res = await fetch(`${baseUrl}/models`, {
                headers: {
                    "Authorization": `Bearer ${llmApiKey}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch models: ${res.statusText}`);
            }

            const data = await res.json();
            const models = Array.isArray(data.data) ? data.data.map((m: any) => m.id) : [];

            if (models.length > 0) {
                setAvailableModels(models.sort());
                setConnectionStatus("success");
                setStatusMessage(`Successfully fetched ${models.length} models.`);
            } else {
                setConnectionStatus("error");
                setStatusMessage("Connected, but no models found.");
            }
        } catch (err: any) {
            setConnectionStatus("error");
            setStatusMessage(err.message || "Connection failed.");
            console.error(err);
        } finally {
            setFetchingModels(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-1">
                    Manage your API keys and configuration. These are stored locally in your browser.
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
                            <label className="text-sm font-medium">Plunk Secret Key</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="sk_..."
                                    value={plunkKey}
                                    onChange={(e) => setPlunkKey(e.target.value)}
                                />
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Verified endpoint: <code>https://api.useplunk.com/v1/send</code>
                            </p>
                        </div>

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
                        </div>
                    </div>
                </div>

                {/* AI Settings */}
                <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <SparklesIcon className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold">AI Generation</h3>
                    </div>

                    <div className="grid gap-4">
                        {/* Base URL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Base URL</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="https://api.openai.com/v1"
                                    value={llmBaseUrl}
                                    onChange={(e) => setLlmBaseUrl(e.target.value)}
                                />
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Standard OpenAI-compatible endpoint.
                            </p>
                        </div>

                        {/* API Key */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">API Key</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="sk-..."
                                    value={llmApiKey}
                                    onChange={(e) => setLlmApiKey(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Fetch Models / Test Connection */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Model ID</label>
                                <button
                                    onClick={fetchModels}
                                    disabled={fetchingModels || !llmBaseUrl || !llmApiKey}
                                    className="text-xs flex items-center gap-1 text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                                >
                                    {fetchingModels ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                                    Fetch Available Models
                                </button>
                            </div>

                            <div className="relative">
                                <Database className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                {availableModels.length > 0 ? (
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={llmModelId}
                                        onChange={(e) => setLlmModelId(e.target.value)}
                                    >
                                        {availableModels.map(model => (
                                            <option key={model} value={model}>{model}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        placeholder="gpt-4o"
                                        value={llmModelId}
                                        onChange={(e) => setLlmModelId(e.target.value)}
                                    />
                                )}

                            </div>

                            {/* Connection Status Feedback */}
                            {statusMessage && (
                                <div className={cn(
                                    "flex items-center gap-2 text-xs mt-2 px-3 py-2 rounded-md",
                                    connectionStatus === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                                )}>
                                    {connectionStatus === "success" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                    {statusMessage}
                                </div>
                            )}
                        </div>
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

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l-1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M9 3v4" />
            <path d="M3 5h4" />
            <path d="M3 9h4" />
        </svg>
    )
}
