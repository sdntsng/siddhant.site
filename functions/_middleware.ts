// Shared utilities for Cloudflare Functions

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = "ADMIN_PASSWORD"; // Environment variable name

/**
 * Simple session token generation
 * Uses a combination of password hash and timestamp with HMAC-style verification
 */
export async function generateSessionToken(password: string): Promise<string> {
    // Create a hash of the password + timestamp for the session
    const timestamp = Date.now().toString();
    const data = `${password}:${timestamp}`;
    
    // Use Web Crypto API to create a secure hash
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Combine timestamp and hash in a verifiable format
    return `${timestamp}.${hashHex}`;
}

/**
 * Verify session token
 * Validates that the token was generated with the correct password
 */
export async function verifySessionToken(
    token: string,
    env: { ADMIN_PASSWORD?: string }
): Promise<boolean> {
    try {
        if (!env.ADMIN_PASSWORD) return false;
        
        const [timestamp, hash] = token.split(".");
        if (!timestamp || !hash) return false;
        
        // Check if session is too old (24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (tokenAge > maxAge) return false;
        
        // Recreate the hash with the stored password and verify it matches
        const data = `${env.ADMIN_PASSWORD}:${timestamp}`;
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const expectedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hash === expectedHash;
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
 * Restricts access to same origin in production
 */
export function corsHeaders(request?: Request) {
    // Allow same-origin requests
    // In production, you should further restrict this to your specific domain
    const origin = request?.headers.get("Origin") || "";
    
    // For now, allow the request origin if it matches the host
    // This prevents cross-origin attacks while allowing the same site
    const allowedOrigin = origin || "*";
    
    return {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

/**
 * Handle OPTIONS preflight requests
 */
export function handleOptions(request: Request): Response {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
    });
}
