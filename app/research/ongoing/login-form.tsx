"use client"

import { type FormEvent, useEffect, useState } from "react"
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type LoginFormProps = {
  next: string
  error?: string
  configured: boolean
}

const errors: Record<string, string> = {
  "wrong-password": "That password doesn’t match. Give it another try.",
  "rate-limit": "Too many attempts. Please wait a few minutes before trying again.",
  unavailable: "This private space is temporarily unavailable. Please try again later.",
}

export function LoginForm({ next, error, configured }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [submissionError, setSubmissionError] = useState<string>()
  const message = submissionError || (!configured
    ? errors.unavailable
    : error && Object.hasOwn(errors, error) ? errors[error] : undefined)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const data = new FormData(form)
    setPending(true)
    setSubmissionError(undefined)
    try {
      const response = await fetch("/research/ongoing/session", {
        method: "POST",
        credentials: "same-origin",
        body: new URLSearchParams({ password: String(data.get("password") || ""), next }),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || !response.redirected) throw new Error("Login could not finish")
      window.location.assign(response.url)
    } catch {
      setSubmissionError("Couldn’t connect. Please try again.")
      setPending(false)
    }
  }

  useEffect(() => {
    const resetPending = () => setPending(false)
    window.addEventListener("pageshow", resetPending)
    return () => window.removeEventListener("pageshow", resetPending)
  }, [])

  return (
    <form
      action="/research/ongoing/session"
      method="post"
      className="space-y-4 text-left"
      onSubmit={submit}
      aria-busy={pending}
    >
      <input type="hidden" name="next" value={next} />
      <div className="space-y-2">
        <label htmlFor="research-password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="research-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter the password"
            required
            maxLength={256}
            disabled={!configured}
            aria-invalid={error === "wrong-password"}
            aria-describedby={message ? "research-login-message" : undefined}
            className="h-12 pr-12"
          />
          <div className="absolute right-1 top-1">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={!configured}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      {message && (
        <p id="research-login-message" role="alert" className="text-sm leading-relaxed text-rose-600 dark:text-rose-300">
          {message}
        </p>
      )}
      <Button type="submit" className="h-12 w-full gap-2" disabled={!configured || pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Opening…
          </>
        ) : (
          <>
            Explore projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  )
}
