import {
    getSessionToken,
    verifySessionToken,
    corsHeaders,
    handleOptions,
} from "../../../_middleware";

interface Env {
    ADMIN_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions(request);
    }

    const token = getSessionToken(request);

    if (!token) {
        return new Response(
            JSON.stringify({ authenticated: false }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders(request),
                },
            }
        );
    }

    const isValid = await verifySessionToken(token, env);

    return new Response(
        JSON.stringify({ authenticated: isValid }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders(request),
            },
        }
    );
};
