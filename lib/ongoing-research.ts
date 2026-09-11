import "server-only"

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

export const RESEARCH_PATH = "/research/ongoing"
export const RESEARCH_COOKIE = "ongoing_research_session"
export const RESEARCH_SESSION_SECONDS = 60 * 60 * 8

export function researchRequestOrigin(request: Request) {
  // Next's internal URL may use localhost even when the browser uses 127.0.0.1.
  const url = new URL(request.url)
  return `${url.protocol}//${request.headers.get("host") || url.host}`
}

export const privateResearchHeaders = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
}

export function researchConfiguration() {
  const password = process.env.ONGOING_RESEARCH_PASSWORD
  const encodedKey = process.env.ONGOING_RESEARCH_SECRET
  if (!password || !encodedKey || !/^[A-Za-z0-9+/]{43}=$/.test(encodedKey)) return null
  const key = Buffer.from(encodedKey, "base64")
  if (key.length !== 32) return null
  return { password, key }
}

export function isResearchConfigured() {
  return researchConfiguration() !== null
}

export function safeResearchReturnPath(value: unknown) {
  // Only known project pages are valid login destinations, never external URLs.
  return value === `${RESEARCH_PATH}/source-localization`
    ? value
    : RESEARCH_PATH
}

export function verifyResearchPassword(candidate: string) {
  const configuration = researchConfiguration()
  if (!configuration || candidate.length > 256) return false
  const hash = (value: string) => createHash("sha256").update(value).digest()
  return timingSafeEqual(hash(candidate), hash(configuration.password))
}

function signSession(payload: string) {
  const configuration = researchConfiguration()
  if (!configuration) return null
  // Domain separation and password binding also revoke sessions on password changes.
  return createHmac("sha256", configuration.key)
    .update("ongoing-research-session-v1\0")
    .update(configuration.password)
    .update("\0")
    .update(payload)
    .digest("base64url")
}

export function createResearchSession() {
  const expires = Math.floor(Date.now() / 1000) + RESEARCH_SESSION_SECONDS
  const payload = `${expires}.${randomBytes(24).toString("base64url")}`
  const signature = signSession(payload)
  if (!signature) throw new Error("Ongoing research is not configured")
  return `${payload}.${signature}`
}

export async function isResearchAuthenticated() {
  const token = cookies().get(RESEARCH_COOKIE)?.value
  if (!token || token.length > 180) return false
  const parts = token.split(".")
  if (parts.length !== 3) return false
  const [expires, nonce, signature] = parts
  if (!/^\d{10}$/.test(expires) || !/^[A-Za-z0-9_-]{32}$/.test(nonce)) return false
  const expiration = Number(expires)
  const now = Math.floor(Date.now() / 1000)
  if (expiration <= now || expiration > now + RESEARCH_SESSION_SECONDS) return false
  const expected = signSession(`${expires}.${nonce}`)
  if (!expected || !/^[A-Za-z0-9_-]{43}$/.test(signature)) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
