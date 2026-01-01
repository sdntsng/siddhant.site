// Type definitions for Cloudflare Pages Functions

interface Env {
    ADMIN_PASSWORD?: string;
    PLUNK_SECRET_KEY?: string;
    LLM_API_KEY?: string;
    LLM_BASE_URL?: string;
    LLM_MODEL_ID?: string;
}

interface PagesFunction<T = unknown> {
    (context: EventContext<T>): Response | Promise<Response>;
}

interface EventContext<T = unknown> {
    request: Request;
    env: T;
    params: Record<string, string>;
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
    next(input?: Request | string, init?: RequestInit): Promise<Response>;
    functionPath: string;
}
