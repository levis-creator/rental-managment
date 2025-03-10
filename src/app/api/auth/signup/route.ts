import { URL } from '@/constants/ApiUrls';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    console.log(email, password);
    const res = await fetch(`${URL}register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Signup failed');
    }

    return NextResponse.json({ message: 'Signup successful' });
   
  } 
   catch (error: unknown) {
  // @ts-expect-error: Ignoring TypeScript error for unknown error type
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
