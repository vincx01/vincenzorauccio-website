export type AssistantLocale = 'it' | 'en'

export type AssistantRole = 'user' | 'assistant'

export interface AssistantMessage {
  role: AssistantRole
  content: string
}

export interface AssistantSource {
  title: string
  path: string
}

export interface AssistantSuccess {
  reply: string
  sources: AssistantSource[]
  responseId: string
}

export interface AssistantError {
  error: 'bad_request' | 'not_configured' | 'rate_limited' | 'provider_unavailable'
  message: string
}

export interface AssistantRequest {
  messages: AssistantMessage[]
  locale: AssistantLocale
}

export interface AssistantFeedbackRequest {
  responseId: string
  rating: 'up' | 'down'
  comment?: string
  locale: AssistantLocale
  question: string
  answer: string
  sources?: AssistantSource[]
}
