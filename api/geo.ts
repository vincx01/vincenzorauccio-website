export const config = { runtime: 'edge' }

/**
 * Country hint used once, on the first visit, to choose Italian or English.
 * The value comes from Vercel's request headers; no IP is stored.
 */
export default function handler(request: Request): Response {
  const country = request.headers.get('x-vercel-ip-country')

  return new Response(JSON.stringify({ country }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'private, no-store',
    },
  })
}
