import { NextRequest, NextResponse } from "next/server"
import { createHash } from "node:crypto"
import {
  createResearchSession,
  isResearchConfigured,
  privateResearchHeaders,
  RESEARCH_COOKIE,
  RESEARCH_PATH,
  RESEARCH_SESSION_SECONDS,
  researchRequestOrigin,
  safeResearchReturnPath,
  verifyResearchPassword,
} from "@/lib/ongoing-research"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const attempts = new Map<string, { count: number; reset: number }>()
const windowMilliseconds = 15 * 60 * 1000
const maximumAttempts = 5

function attemptKey(request: NextRequest) {
  // Vercel supplies this header; do not trust arbitrary forwarded headers locally.
  const address = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") : "local"
  return createHash("sha256").update(address || "unknown").digest("hex")
}

function loginRedirect(request: NextRequest, next: string, error?: string) {
  const url = new URL(RESEARCH_PATH, researchRequestOrigin(request))
  if (next !== RESEARCH_PATH) url.searchParams.set("next", next)
  if (error) url.searchParams.set("error", error)
  return NextResponse.redirect(url, { status: 303, headers: privateResearchHeaders })
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== researchRequestOrigin(request)) {
    return new NextResponse("Forbidden", { status: 403, headers: privateResearchHeaders })
  }
  if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return new NextResponse("Unsupported form", { status: 415, headers: privateResearchHeaders })
  }
  if (Number(request.headers.get("content-length")) > 2048) {
    return new NextResponse("Form too large", { status: 413, headers: privateResearchHeaders })
  }
  const body = await request.text()
  if (body.length > 2048) return new NextResponse("Form too large", { status: 413, headers: privateResearchHeaders })
  const form = new URLSearchParams(body)
  const next = safeResearchReturnPath(form.get("next"))
  const cookieOptions = {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "strict" as const,
    path: RESEARCH_PATH,
  }

  if (form.get("action") === "logout") {
    const response = loginRedirect(request, RESEARCH_PATH)
    response.cookies.set(RESEARCH_COOKIE, "", { ...cookieOptions, maxAge: 0 })
    return response
  }
  if (!isResearchConfigured()) return loginRedirect(request, next, "unavailable")

  const now = Date.now()
  for (const [key, attempt] of attempts) if (attempt.reset <= now) attempts.delete(key)
  const key = attemptKey(request)
  const previous = attempts.get(key)
  if ((previous && previous.count >= maximumAttempts) || (!previous && attempts.size >= 10_000)) {
    return loginRedirect(request, next, "rate-limit")
  }

  if (!verifyResearchPassword(form.get("password") || "")) {
    attempts.set(key, { count: (previous?.count || 0) + 1, reset: previous?.reset || now + windowMilliseconds })
    return loginRedirect(request, next, "wrong-password")
  }

  attempts.delete(key)
  const response = NextResponse.redirect(new URL(next, researchRequestOrigin(request)), { status: 303, headers: privateResearchHeaders })
  response.cookies.set(RESEARCH_COOKIE, createResearchSession(), { ...cookieOptions, maxAge: RESEARCH_SESSION_SECONDS })
  return response
}
