import { NextResponse } from 'next/server';
import { setTokens } from '@/lib/token';
import { URL } from '@/constants/ApiUrls';


export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        const res = await fetch(`${URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const { accessToken, refreshToken } = await res.json();
            await setTokens(accessToken, refreshToken);
        
            return NextResponse.json({ message: 'Login Successful' }, { status: 200 });
          }
        
    } catch (error) {
        console.log(error)
        NextResponse.json({ error: 'Login failed' },{status:500})
    }

}
