import "server-only"

import { createDecipheriv } from "node:crypto"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { gunzipSync } from "node:zlib"
import { researchConfiguration } from "./ongoing-research"

const contentTypes: Record<string, string> = {
  "index.html": "text/html; charset=utf-8",
  "index_ru.html": "text/html; charset=utf-8",
  "NOTATION.md": "text/plain; charset=utf-8",
  "iclr_draft_v3.pdf": "application/pdf",
}

function addResearchNavigation(html: string, name: string) {
  const label = name === "index_ru.html" ? "К странице исследований" : "Back to research page"
  const link = `<a class="research-back-link" href="/research" aria-label="${label}" title="${label}"><span aria-hidden="true">←</span><span class="research-back-label">${label}</span></a>`
  const styles = `<style>
    .research-header-links{display:flex;align-items:center;gap:24px}
    .research-back-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 12px;border:1px solid var(--line);border-radius:5px;color:var(--teal);font-size:14px;font-weight:550;text-decoration:none;white-space:nowrap}
    .research-back-link:hover{background:var(--teal-soft);border-color:var(--teal)}
    @media(max-width:1000px){.research-header-links .wordmark{display:none}}
    @media(max-width:600px){.research-back-label{display:none}.research-back-link{width:44px;justify-content:center;padding:6px;font-size:20px}}
  </style>`

  return html
    .replace(/<a class="wordmark"[^>]*>[\s\S]*?<\/a>/, (wordmark) => `<div class="research-header-links">${link}${wordmark}</div>`)
    .replace("</head>", `${styles}</head>`)
}

export async function readResearchFile(name: string) {
  // Explicit names prevent traversal and keep filesystem paths independent of input.
  if (!Object.hasOwn(contentTypes, name)) return null
  const configuration = researchConfiguration()
  if (!configuration) return null
  const encrypted = await readFile(path.join(process.cwd(), "private", "ongoing-research.enc"))
  if (encrypted.subarray(0, 4).toString() !== "ARP1") throw new Error("Invalid research bundle")
  const decipher = createDecipheriv("aes-256-gcm", configuration.key, encrypted.subarray(4, 16))
  decipher.setAuthTag(encrypted.subarray(16, 32))
  const compressed = Buffer.concat([decipher.update(encrypted.subarray(32)), decipher.final()])
  const files = JSON.parse(gunzipSync(compressed, { maxOutputLength: 20 * 1024 * 1024 }).toString("utf8"))
  const encodedFile = files[name]
  if (typeof encodedFile !== "string") return null
  const body = Buffer.from(encodedFile, "base64")
  return {
    body: name.endsWith(".html") ? Buffer.from(addResearchNavigation(body.toString("utf8"), name)) : body,
    contentType: contentTypes[name],
  }
}
