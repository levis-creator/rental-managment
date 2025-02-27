interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache; // Supports Next.js caching strategies
}

export async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
    body,
    cache = 'no-cache', // Prevents stale data in Next.js
  } = options;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache, // Enables caching control
      next: { revalidate: 10 }, // Revalidates every 10 seconds (for Next.js API routes)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // ✅ Check if response is empty before parsing JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return null; // Return null for empty responses
    }
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
