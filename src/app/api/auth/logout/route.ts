import { removeTokens } from '@/lib/token';

export async function GET() {
  await removeTokens();
  return Response.json({ message: 'Logout successful' });
}
