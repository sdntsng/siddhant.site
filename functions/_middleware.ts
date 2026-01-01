// Shared utilities for Cloudflare Functions

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = "ADMIN_PASSWORD"; // Environment variable name

/**
 * Simple session token generation
 * In production, you might want to use a more secure approach with JWT
 */
export function generateSessionToken(password: string): string {
    // Create a simple hash-based token
    return btoa(`${password}:${Date.now()}`);
}

/**
 * Verify session token
 */
export async function verifySessionToken(
    token: string,
    env: { ADMIN_PASSWORD?: string }
): Promise<boolean> {
    try {
        const decoded = atob(token);
        const [password] = decoded.split(":");
        return password === env.ADMIN_PASSWORD;
    } catch {
        return false;
    }
}

/**
 * Extract session token from cookies
 */
export function getSessionToken(request: Request): string | null {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const sessionCookie = cookies.find((c) =>
        c.startsWith(`${SESSION_COOKIE_NAME}=`)
    );

    if (!sessionCookie) return null;

    return sessionCookie.split("=")[1];
}

/**
 * Create session cookie header
 */
export function createSessionCookie(token: string): string {
    // Set cookie with secure flags
    // In production, you'd want to add Secure flag if using HTTPS
    return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

/**
 * Create delete session cookie header
 */
export function deleteSessionCookie(): string {
    return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

/**
 * Middleware to check authentication for /api/admin/* routes
 */
export async function requireAuth(
    request: Request,
    env: any
): Promise<Response | null> {
    const token = getSessionToken(request);

    if (!token || !(await verifySessionToken(token, env))) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    return null; // Null means authentication passed
}

/**
 * CORS headers for admin API routes
 */
export function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*", // In production, restrict this
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
}

/**
 * Handle OPTIONS preflight requests
 */
export function handleOptions(): Response {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}
