'use server';

import { cookies } from 'next/headers';

// Set both accessToken and refreshToken
export const setTokens = async (accessToken: string, refreshToken: string) => {
  const cookiesStore = await cookies();

  // Store Access Token
  cookiesStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600, // 1 hour
  });

  // Store Refresh Token (Longer expiry)
  cookiesStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 3600, // 7 Days
  });
};

export const getToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('accessToken')?.value;
};

export const getRefreshToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get('refreshToken')?.value;
};

export const removeTokens = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('accessToken');
  cookiesStore.delete('refreshToken');
};
