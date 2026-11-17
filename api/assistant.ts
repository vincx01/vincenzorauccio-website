import { handleAssistantRequest } from '../src/ai/http'

export const config = { runtime: 'edge' }

declare const process: { env: Record<string, string | undefined> }

/**
 * Vercel Edge entry point for the AI chat. The key stays server-side and is
 * read from the project's environment variables.
 */
export default function handler(request: Request): Promise<Response> {
  return handleAssistantRequest(request, {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
  })
}
