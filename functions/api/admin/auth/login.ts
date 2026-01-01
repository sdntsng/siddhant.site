import {
    generateSessionToken,
    createSessionCookie,
    corsHeaders,
    handleOptions,
} from "../../../_middleware";

interface Env {
    ADMIN_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions(request);
    }

    try {
        const { password } = await request.json();

        // Verify password against environment variable
        if (password === env.ADMIN_PASSWORD) {
            const token = await generateSessionToken(password);
            const cookie = createSessionCookie(token);

            return new Response(
                JSON.stringify({ success: true, message: "Authenticated" }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Set-Cookie": cookie,
                        ...corsHeaders(request),
                    },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid password" }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json",
                        ...corsHeaders(request),
                    },
                }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: "Invalid request" }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders(request),
                },
            }
        );
    }
};
