"use client"

import { type FormEvent, useState } from "react"
import { Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)

  async function logout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setPending(true)
    setFailed(false)
    try {
      const response = await fetch("/research/ongoing/session", {
        method: "POST",
        credentials: "same-origin",
        body: new URLSearchParams({ action: "logout" }),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || !response.redirected) throw new Error("Logout could not finish")
      window.location.assign(response.url)
    } catch {
      setPending(false)
      setFailed(true)
    }
  }

  return (
    <form action="/research/ongoing/session" method="post" onSubmit={logout}>
      <input type="hidden" name="action" value="logout" />
      <Button type="submit" variant="ghost" size="sm" className="gap-2 text-muted-foreground" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogOut className="h-4 w-4" aria-hidden="true" />}
        Log out
      </Button>
      {failed && <p role="alert" className="text-xs text-rose-400">Couldn’t log out. Please try again.</p>}
    </form>
  )
}
