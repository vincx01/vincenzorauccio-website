import { Hono } from 'hono'

import { handleAssistantRequest, handleFeedbackRequest } from '../ai/http'

type Bindings = {
  ASSETS: Fetcher
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string
  OPENAI_BASE_URL?: string
  ASSISTANT_FEEDBACK_WEBHOOK_URL?: string
}

const app = new Hono<{ Bindings: Bindings }>()

/** Country hint for first-visit language detection. No data is stored. */
app.get('/api/geo', (c) => {
  const country =
    c.req.raw.cf?.country ??
    c.req.header('cf-ipcountry') ??
    c.req.header('x-vercel-ip-country') ??
    null

  return c.json(
    { country },
    200,
    { 'Cache-Control': 'private, no-store' },
  )
})

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/assistant', (c) => handleAssistantRequest(c.req.raw, c.env))
app.post('/api/assistant-feedback', (c) => handleFeedbackRequest(c.req.raw, c.env))

// Legacy Italian URLs keep their SEO value with a permanent redirect to /it.
const legacyPaths: Record<string, string> = {
  '/about': '/it/about',
  '/chi-sono': '/it/about',
  '/experience': '/it/experience',
  '/esperienza': '/it/experience',
  '/projects': '/it/projects',
  '/progetti': '/it/projects',
  '/work': '/it/projects',
  '/contact': '/it/contact',
  '/contatti': '/it/contact',
  '/recognition': '/it/recognition',
  '/insights': '/it/insights',
  '/privacy': '/it/privacy',
  '/cookie-policy': '/it/cookie-policy',
  '/cookie': '/it/cookie-policy',
  '/design-system': '/it/design-system',
}

const legacyArticles = new Set([
  'introducing-synclin',
  'vincenzo-rauccio-named-most-influential-fintech-entrepreneur-2025-italy-by-wealth-finance-international',
  'blockchain-transforming-elections-for-a-transparent-future',
  'blockchain-in-government',
  'revolutionizing-the-flow-how-blockchain-is-reshaping-the-supply-chain',
])

for (const [source, destination] of Object.entries(legacyPaths)) {
  app.get(source, (c) => c.redirect(destination, 301))
}

app.get('/blog', (c) => c.redirect('/it/insights', 301))
app.get('/blog/*', (c) => c.redirect('/it/insights', 301))
app.get('/category/:slug', (c) => c.redirect(`/it/insights?category=${c.req.param('slug')}`, 301))
app.get('/tag/*', (c) => c.redirect('/it/insights', 301))

for (const slug of legacyArticles) {
  app.get(`/${slug}`, (c) => c.redirect(`/it/${slug}`, 301))
}

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
