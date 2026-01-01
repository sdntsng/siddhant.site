import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export const runtime = 'edge';

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password } = body;

        if (password === process.env.ADMIN_PASSWORD) {
            const cookie = serialize('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: MAX_AGE,
                path: '/',
            });

            return NextResponse.json(
                { success: true },
                {
                    status: 200,
                    headers: { 'Set-Cookie': cookie },
                }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Incorrect password' },
            { status: 401 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, error: 'Invalid request' },
            { status: 400 }
        );
    }
}
