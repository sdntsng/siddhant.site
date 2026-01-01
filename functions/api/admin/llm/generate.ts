import { requireAuth, corsHeaders, handleOptions } from "../../_middleware";

interface Env {
    ADMIN_PASSWORD?: string;
    LLM_API_KEY?: string;
    LLM_BASE_URL?: string;
    LLM_MODEL_ID?: string;
}

// POST - Generate content with LLM
export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions();
    }

    // Check authentication
    const authError = await requireAuth(request, env);
    if (authError) return authError;

    // Proxy to LLM API (OpenAI-compatible)
    try {
        const body = await request.text();
        const baseUrl = env.LLM_BASE_URL || "https://api.openai.com/v1";

        const llmResponse = await fetch(`${baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${env.LLM_API_KEY}`,
                "Content-Type": "application/json",
            },
            body,
        });

        const data = await llmResponse.json();

        return new Response(JSON.stringify(data), {
            status: llmResponse.status,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders(),
            },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || "Failed to generate content" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders(),
                },
            }
        );
    }
};
