import { handleFeedbackRequest } from '../src/ai/http'

export const config = { runtime: 'edge' }

declare const process: { env: Record<string, string | undefined> }

/** Vercel Edge entry point for optional answer feedback. */
export default function handler(request: Request): Promise<Response> {
  return handleFeedbackRequest(request, {
    ASSISTANT_FEEDBACK_WEBHOOK_URL: process.env.ASSISTANT_FEEDBACK_WEBHOOK_URL,
  })
}
