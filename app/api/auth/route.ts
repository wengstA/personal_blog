import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create session cookie
    const response = NextResponse.json({ success: true });
    const cookieStore = await cookies();
    cookieStore.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
  return response;
}