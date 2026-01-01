import { deleteSessionCookie, corsHeaders, handleOptions } from "../../../_middleware";

export const onRequestPost: PagesFunction = async (context) => {
    const { request } = context;

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
        return handleOptions(request);
    }

    const cookie = deleteSessionCookie();

    return new Response(
        JSON.stringify({ success: true, message: "Logged out" }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": cookie,
                ...corsHeaders(request),
            },
        }
    );
};
