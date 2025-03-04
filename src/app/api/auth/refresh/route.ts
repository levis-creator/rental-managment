import { getRefreshToken, setTokens } from '@/lib/token';
import { NextResponse } from 'next/server';

export async function GET() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token missing' }, { status: 401 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const { accessToken, refreshToken: newRefreshToken } = await response.json();
    await setTokens(accessToken, newRefreshToken);

    return NextResponse.json({ message: 'Token refreshed' });
  }

  return NextResponse.json({ error: 'Invalid Refresh Token' }, { status: 403 });
}
