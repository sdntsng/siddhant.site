import { requireAuth, corsHeaders, handleOptions } from "../../../../../_middleware";

interface Env {
    ADMIN_PASSWORD?: string;
    PLUNK_SECRET_KEY?: string;
}

// POST - Send/Schedule campaign
export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env, params } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions(request);
    }

    // Check authentication
    const authError = await requireAuth(request, env);
    if (authError) return authError;

    const campaignId = params.id as string;

    // Proxy to Plunk API
    try {
        const body = await request.text();

        const plunkResponse = await fetch(
            `https://next-api.useplunk.com/v1/campaigns/${campaignId}/send`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${env.PLUNK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body,
            }
        );

        const data = await plunkResponse.json();

        return new Response(JSON.stringify(data), {
            status: plunkResponse.status,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders(request),
            },
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || "Failed to send campaign" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders(request),
                },
            }
        );
    }
};
