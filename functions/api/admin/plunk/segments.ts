import { requireAuth, corsHeaders, handleOptions } from "../../_middleware";

interface Env {
    ADMIN_PASSWORD?: string;
    PLUNK_SECRET_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions();
    }

    // Check authentication
    const authError = await requireAuth(request, env);
    if (authError) return authError;

    // Proxy to Plunk API
    try {
        const plunkResponse = await fetch(
            "https://next-api.useplunk.com/v1/segments",
            {
                headers: {
                    Authorization: `Bearer ${env.PLUNK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await plunkResponse.json();

        return new Response(JSON.stringify(data), {
            status: plunkResponse.status,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders(),
            },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || "Failed to fetch segments" }),
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
