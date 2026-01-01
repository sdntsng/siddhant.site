import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
    const path = params.path.join('/');
    const url = new URL(req.url);
    const destinationUrl = `https://next-api.useplunk.com/${path}${url.search}`;

    try {
        const response = await fetch(destinationUrl, {
            method: 'POST',
            headers: req.headers,
            body: req.body,
        });
        return response;
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Proxy Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
    const path = params.path.join('/');
    const url = new URL(req.url);
    const destinationUrl = `https://next-api.useplunk.com/${path}${url.search}`;

    try {
        const response = await fetch(destinationUrl, {
            method: 'GET',
            headers: req.headers,
        });
        return response;
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Proxy Error" }, { status: 500 });
    }
}
