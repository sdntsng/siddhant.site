import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const cookie = req.cookies.get('admin_session');

    // Basic Auth Check (Cookie)
    if (!cookie || cookie.value !== 'true') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.text();
        // Use env vars or defaults
        const baseUrl = process.env.LLM_BASE_URL || "https://api.openai.com/v1";
        const apiKey = process.env.LLM_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "LLM API Key not configured on server" }, { status: 500 });
        }

        const llmResponse = await fetch(`${baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body,
        });

        const data = await llmResponse.json();

        return NextResponse.json(data, {
            status: llmResponse.status,
        });

    } catch (e: any) {
        return NextResponse.json(
            { error: e.message || "Failed to generate content" },
            { status: 500 }
        );
    }
}
