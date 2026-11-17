import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUp,
  Check,
  LoaderCircle,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { site } from '../../../data/site'
import type { AssistantSource } from '../../../ai/types'
import { localizedAssistant } from '../../../i18n/assistant'
import { LocaleLink, useLocale } from '../../../i18n/core'
import { useConsent } from '../consent/CookieConsent'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  sources?: AssistantSource[]
  responseId?: string
  question?: string
  welcome?: boolean
}

type ErrorKind = 'error' | 'notConfigured' | 'rateLimited'

interface FeedbackEntry {
  rating: 'up' | 'down'
  status: 'comment' | 'sending' | 'sent' | 'error' | 'idle'
}

interface AssistantSuccessPayload {
  reply?: unknown
  sources?: unknown
  responseId?: unknown
  error?: unknown
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function parseSources(value: unknown): AssistantSource[] {
  if (!Array.isArray(value)) return []

  return value
    .filter(
      (source): source is AssistantSource =>
        Boolean(
          source &&
            typeof source === 'object' &&
            typeof (source as AssistantSource).title === 'string' &&
            typeof (source as AssistantSource).path === 'string' &&
            (source as AssistantSource).path.startsWith('/'),
        ),
    )
    .slice(0, 6)
}

export function AIAssistant() {
  const { locale } = useLocale()
  const { consent, preferencesOpen } = useConsent()
  const copy = localizedAssistant(locale)
  const reduce = useReducedMotion()
  const email = site.email

  const [open, setOpen] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorKind | null>(null)
  const [feedback, setFeedback] = useState<Record<string, FeedbackEntry>>({})
  const [comment, setComment] = useState('')

  const openerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  const showWelcome = !messages.some((message) => message.role === 'user')

  useEffect(() => {
    if (!open || hasWelcomed) return

    setHasWelcomed(true)
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: copy.welcome,
        welcome: true,
      },
    ])
  }, [copy.welcome, hasWelcomed, open])

  useEffect(() => {
    setMessages((current) => {
      if (current.length !== 1 || !current[0]?.welcome) return current
      if (current[0].content === copy.welcome) return current
      return [{ ...current[0], content: copy.welcome }]
    })
  }, [copy.welcome])

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false
        openerRef.current?.focus()
      }
      return
    }

    wasOpen.current = true
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const node = logRef.current
    if (!node) return

    node.scrollTo({
      top: node.scrollHeight,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [error, loading, messages, open, reduce])

  async function sendMessage(text: string) {
    const value = text.trim()
    if (!value || loading) return

    const userMessage: ChatMessage = {
      id: newId(),
      role: 'user',
      content: value,
    }
    const nextMessages = [...messages, userMessage]
    const apiMessages = nextMessages
      .filter((message) => !message.welcome)
      .slice(-8)
      .map((message) => ({ role: message.role, content: message.content }))

    setMessages(nextMessages)
    setDraft('')
    setError(null)
    setLoading(true)

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 32_000)

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        signal: controller.signal,
        body: JSON.stringify({ messages: apiMessages, locale }),
      })
      const payload = (await response.json().catch(() => null)) as AssistantSuccessPayload | null

      if (!response.ok) {
        if (payload?.error === 'not_configured') setError('notConfigured')
        else if (payload?.error === 'rate_limited') setError('rateLimited')
        else setError('error')
        return
      }

      if (!payload || typeof payload.reply !== 'string' || !payload.reply.trim()) {
        setError('error')
        return
      }

      setMessages((current) => [
        ...current,
        {
          id: newId(),
          role: 'assistant',
          content: payload.reply as string,
          sources: parseSources(payload.sources),
          responseId: typeof payload.responseId === 'string' ? payload.responseId : undefined,
          question: value,
        },
      ])
    } catch {
      setError('error')
    } finally {
      window.clearTimeout(timeout)
      setLoading(false)
    }
  }

  function close() {
    setOpen(false)
  }

  async function submitFeedback(
    message: ChatMessage,
    rating: 'up' | 'down',
    feedbackComment?: string,
  ) {
    if (!message.responseId || !message.question) return

    setFeedback((current) => ({
      ...current,
      [message.id]: { rating, status: 'sending' },
    }))

    try {
      const response = await fetch('/api/assistant-feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        body: JSON.stringify({
          responseId: message.responseId,
          rating,
          comment: rating === 'down' ? feedbackComment?.trim() || undefined : undefined,
          locale,
          question: message.question,
          answer: message.content,
          sources: message.sources,
        }),
      })

      if (!response.ok) throw new Error('Feedback request failed')

      setFeedback((current) => ({
        ...current,
        [message.id]: { rating, status: 'sent' },
      }))
      setComment('')
    } catch {
      setFeedback((current) => ({
        ...current,
        [message.id]: { rating, status: 'error' },
      }))
    }
  }

  function startNegativeFeedback(message: ChatMessage) {
    setComment('')
    setFeedback((current) => ({
      ...current,
      [message.id]: { rating: 'down', status: 'comment' },
    }))
  }

  const closeLabel = copy.closeLabel

  // The first-visit cookie banner and its preferences dialog sit above the
  // floating layer. Keeping the launcher out of that area avoids a click
  // landing on the banner and a visual overlap with the consent controls.
  if (!consent || preferencesOpen) return null

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.section
            id="ai-assistant-panel"
            role="dialog"
            aria-labelledby="ai-assistant-title"
            aria-describedby="ai-assistant-subtitle"
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 flex h-[min(84dvh,40rem)] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-canvas text-ink shadow-[0_24px_80px_rgba(16,29,50,0.28)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(38rem,calc(100dvh-8rem))] sm:w-[24.5rem]"
          >
            <header data-surface="dark" className="bg-canvas px-5 pb-4 pt-5 text-ink">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow text-ink-faint">AI Assistant</p>
                  <h2
                    id="ai-assistant-title"
                    className="mt-1.5 font-display text-[0.95rem] leading-tight"
                  >
                    {copy.title}
                  </h2>
                  <p id="ai-assistant-subtitle" className="mt-2 text-caption text-ink-muted">
                    {copy.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={closeLabel}
                  className="grid size-8 shrink-0 place-items-center border border-line-strong transition-colors hover:border-ink hover:bg-raised"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>

              <p className="mt-3 flex items-center gap-2 text-caption text-ink-muted">
                <span className="relative flex size-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-pulse rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {copy.available}
              </p>
            </header>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              className="min-h-0 flex-1 overflow-y-auto bg-canvas px-4 py-4 sm:px-5"
            >
              <div className="flex flex-col gap-3">
                {messages.map((message) => {
                  const entry = feedback[message.id]
                  const isUser = message.role === 'user'
                  const isAssistant = message.role === 'assistant'

                  return (
                    <div
                      key={message.id}
                      className={isUser ? 'ml-7 flex justify-end' : 'mr-2 flex justify-start'}
                    >
                      <div
                        className={
                          isUser
                            ? 'max-w-[92%] rounded-[var(--radius-sm)] bg-ink px-3.5 py-2.5 text-canvas'
                            : 'max-w-[95%] rounded-[var(--radius-sm)] border border-line bg-raised px-3.5 py-3'
                        }
                      >
                        <p className="whitespace-pre-wrap text-small">{message.content}</p>

                        {isAssistant && message.sources && message.sources.length > 0 && (
                          <div className="mt-3 border-t border-line pt-2.5">
                            <p className="eyebrow text-ink-faint">{copy.sources}</p>
                            <ul className="mt-2 flex flex-col gap-1.5">
                              {message.sources.map((source, index) => (
                                <li key={`${source.path}-${index}`} className="text-caption">
                                  <Link
                                    to={source.path}
                                    onClick={close}
                                    className="inline-flex max-w-full items-start gap-1.5 text-ink-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink hover:decoration-ink"
                                  >
                                    <span className="shrink-0 font-medium text-ink-faint">
                                      [{index + 1}]
                                    </span>
                                    <span className="break-words">{source.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {isAssistant && !message.welcome && message.responseId && (
                          <div className="mt-3 border-t border-line pt-2">
                            {entry?.status === 'sent' ? (
                              <p
                                role="status"
                                className="flex items-center gap-1.5 text-caption text-ink-muted"
                              >
                                <Check aria-hidden="true" className="size-3.5" />
                                {copy.feedback.thanks}
                              </p>
                            ) : (
                              <>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => void submitFeedback(message, 'up')}
                                    disabled={entry?.status === 'sending'}
                                    aria-label={copy.feedback.helpful}
                                    aria-pressed={entry?.rating === 'up'}
                                    title={copy.feedback.helpful}
                                    className={`grid size-7 place-items-center border transition-colors disabled:opacity-50 ${
                                      entry?.rating === 'up'
                                        ? 'border-ink bg-ink text-canvas'
                                        : 'border-line-strong text-ink-muted hover:border-ink hover:text-ink'
                                    }`}
                                  >
                                    <ThumbsUp aria-hidden="true" className="size-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => startNegativeFeedback(message)}
                                    disabled={entry?.status === 'sending'}
                                    aria-label={copy.feedback.notHelpful}
                                    aria-pressed={entry?.rating === 'down'}
                                    title={copy.feedback.notHelpful}
                                    className={`grid size-7 place-items-center border transition-colors disabled:opacity-50 ${
                                      entry?.rating === 'down'
                                        ? 'border-ink bg-ink text-canvas'
                                        : 'border-line-strong text-ink-muted hover:border-ink hover:text-ink'
                                    }`}
                                  >
                                    <ThumbsDown aria-hidden="true" className="size-3.5" />
                                  </button>
                                  {entry?.status === 'sending' && (
                                    <LoaderCircle
                                      aria-hidden="true"
                                      className="ml-1 size-3.5 animate-spin text-ink-faint"
                                    />
                                  )}
                                </div>

                                {(entry?.status === 'comment' || entry?.status === 'error') &&
                                  entry.rating === 'down' && (
                                    <form
                                      className="mt-2"
                                      onSubmit={(event) => {
                                        event.preventDefault()
                                        void submitFeedback(message, 'down', comment)
                                      }}
                                    >
                                      <label
                                        htmlFor={`feedback-${message.id}`}
                                        className="sr-only"
                                      >
                                        {copy.feedback.commentLabel}
                                      </label>
                                      <textarea
                                        id={`feedback-${message.id}`}
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                        maxLength={500}
                                        rows={2}
                                        placeholder={copy.feedback.commentPlaceholder}
                                        className="field__control min-h-[3.25rem] py-2 text-caption"
                                      />
                                      <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <button
                                          type="submit"
                                          className="btn btn--primary btn--sm min-h-8 px-2.5 text-[0.7rem]"
                                        >
                                          {copy.feedback.send}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setComment('')
                                            setFeedback((current) => ({
                                              ...current,
                                              [message.id]: {
                                                rating: 'down',
                                                status: 'idle',
                                              },
                                            }))
                                          }}
                                          className="text-caption text-ink-muted underline decoration-line-strong underline-offset-2 hover:text-ink"
                                        >
                                          {copy.feedback.cancel}
                                        </button>
                                      </div>
                                    </form>
                                  )}

                                {entry?.status === 'error' && (
                                  <p className="mt-2 text-caption text-danger" role="alert">
                                    {copy.feedback.error}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {showWelcome && (
                  <div className="mr-2 flex flex-wrap gap-1.5">
                    {copy.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => void sendMessage(suggestion)}
                        disabled={loading}
                        className="border border-line-strong px-2.5 py-1.5 text-left text-caption text-ink-muted transition-colors hover:border-ink hover:bg-raised hover:text-ink disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="mr-2 flex justify-start" role="status">
                    <div className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-line bg-raised px-3.5 py-2.5 text-caption text-ink-muted">
                      <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
                      {copy.thinking}
                    </div>
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="mr-2 rounded-[var(--radius-sm)] border border-danger/40 bg-raised px-3.5 py-2.5 text-caption text-ink-muted"
                  >
                    <p>
                      {copy[error]}{' '}
                      {error !== 'rateLimited' && (
                        <a
                          href={`mailto:${email}`}
                          className="text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink"
                        >
                          {email}
                        </a>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-line bg-canvas px-4 pb-3 pt-3 sm:px-5">
              <form
                ref={formRef}
                onSubmit={(event) => {
                  event.preventDefault()
                  void sendMessage(draft)
                }}
              >
                <label htmlFor="ai-assistant-input" className="sr-only">
                  {copy.inputLabel}
                </label>
                <div className="flex items-end gap-1.5 border border-line-strong bg-canvas p-1 transition-colors focus-within:border-accent">
                  <textarea
                    ref={inputRef}
                    id="ai-assistant-input"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter' &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault()
                        formRef.current?.requestSubmit()
                      }
                    }}
                    rows={1}
                    maxLength={1_000}
                    placeholder={copy.placeholder}
                    className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-small outline-none placeholder:text-ink-faint"
                  />
                  <button
                    type="submit"
                    disabled={loading || !draft.trim()}
                    aria-label={copy.send}
                    title={copy.send}
                    className="grid size-9 shrink-0 place-items-center bg-ink text-canvas transition-opacity disabled:opacity-40"
                  >
                    {loading ? (
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                    ) : (
                      <ArrowUp aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-2 text-[0.68rem] leading-relaxed text-ink-faint">
                {copy.privacy}{' '}
                <LocaleLink
                  to="/privacy"
                  onClick={close}
                  className="underline decoration-line-strong underline-offset-2 hover:text-ink"
                >
                  {copy.privacyLink}
                </LocaleLink>
                .
              </p>
              <p className="mt-1 text-[0.68rem] leading-relaxed text-ink-faint">
                {copy.disclaimer}
              </p>
            </div>
          </motion.section>
        ) : (
          <motion.button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={copy.openLabel}
            aria-haspopup="dialog"
            aria-controls="ai-assistant-panel"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.35, ease: 'easeOut' }}
            className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-11 items-center gap-2 rounded-[var(--radius-md)] border border-line-strong bg-canvas px-3.5 text-ink shadow-[0_12px_35px_rgba(16,29,50,0.18)] transition-colors hover:border-ink hover:bg-raised sm:bottom-6 sm:right-6"
          >
            <Sparkles aria-hidden="true" className="size-4 text-accent-ink" />
            <span className="hidden text-caption font-medium sm:inline">AI Assistant</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
