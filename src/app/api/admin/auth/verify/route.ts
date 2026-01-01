import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const cookie = req.cookies.get('admin_session');

    if (cookie && cookie.value === 'true') {
        return NextResponse.json({ authenticated: true }, { status: 200 });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
}
