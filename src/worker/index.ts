import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// I vecchi percorsi WordPress portano all’indice editoriale. Gli articoli
// vivono già alla radice, quindi servono solo redirect per tassonomie e blog.
app.get('/blog', (c) => c.redirect('/insights', 301))
app.get('/blog/*', (c) => c.redirect('/insights', 301))
app.get('/category/:slug', (c) => c.redirect(`/insights?category=${c.req.param('slug')}`, 301))
app.get('/tag/*', (c) => c.redirect('/insights', 301))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
