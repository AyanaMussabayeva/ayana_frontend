import "server-only"

import { createDecipheriv } from "node:crypto"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { gunzipSync } from "node:zlib"
import { researchConfiguration, type ResearchProject } from "./ongoing-research"
import { sourceLocalizationTheme } from "./source-localization-theme"

const sourceLocalizationTypes: Record<string, string> = {
  "index.html": "text/html; charset=utf-8",
  "index_ru.html": "text/html; charset=utf-8",
  "NOTATION.md": "text/plain; charset=utf-8",
  "iclr_draft_v3.pdf": "application/pdf",
  "iclr_draft_v4.pdf": "application/pdf",
  "data_method_overview_editable.png": "image/png",
}

const projects: Record<ResearchProject, {
  bundle: string
  contentType: (name: string) => string | undefined
  accent: string
  accentSoft: string
  theme: string
}> = {
  "source-localization": {
    bundle: "ongoing-research.enc",
    contentType: (name) => Object.hasOwn(sourceLocalizationTypes, name) ? sourceLocalizationTypes[name] : undefined,
    accent: "var(--teal)",
    accentSoft: "var(--teal-soft)",
    theme: sourceLocalizationTheme,
  },
  "same-images-different-headsets": {
    bundle: "same-images-different-headsets.enc",
    // Figures are looked up by key in the decrypted bundle, never on the filesystem.
    contentType: (name) => name === "index.html"
      ? "text/html; charset=utf-8"
      : /^img\/[a-z0-9_]+\.png$/.test(name) ? "image/png" : undefined,
    accent: "var(--cyan)",
    accentSoft: "var(--cyan-soft)",
    theme: "",
  },
}

function addResearchNavigation(html: string, name: string, project: (typeof projects)[ResearchProject]) {
  const label = name === "index_ru.html" ? "К странице исследований" : "Back to research page"
  const link = `<a class="research-back-link" href="/research" aria-label="${label}" title="${label}"><span aria-hidden="true">←</span><span class="research-back-label">${label}</span></a>`
  const styles = `<style>
    .research-header-links{display:flex;align-items:center;gap:24px}
    .research-back-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 12px;border:1px solid var(--line);border-radius:5px;color:${project.accent};font-size:14px;font-weight:550;text-decoration:none;white-space:nowrap}
    .research-back-link:hover{background:${project.accentSoft};border-color:${project.accent}}
    @media(max-width:1000px){.research-header-links .wordmark{display:none}}
    @media(max-width:600px){.research-back-label{display:none}.research-back-link{width:44px;justify-content:center;padding:6px;font-size:20px}}
    ${project.theme}
  </style>`

  return html
    .replace(/<a class="wordmark"[^>]*>[\s\S]*?<\/a>/, (wordmark) => `<div class="research-header-links">${link}${wordmark}</div>`)
    .replace("</head>", `${styles}</head>`)
}

export async function readResearchFile(projectName: ResearchProject, name: string) {
  // Explicit names prevent traversal and keep filesystem paths independent of input.
  const project = projects[projectName]
  const contentType = project.contentType(name)
  if (!contentType) return null
  const configuration = researchConfiguration()
  if (!configuration) return null
  const encrypted = await readFile(path.join(process.cwd(), "private", project.bundle))
  if (encrypted.subarray(0, 4).toString() !== "ARP1") throw new Error("Invalid research bundle")
  const decipher = createDecipheriv("aes-256-gcm", configuration.key, encrypted.subarray(4, 16))
  decipher.setAuthTag(encrypted.subarray(16, 32))
  const compressed = Buffer.concat([decipher.update(encrypted.subarray(32)), decipher.final()])
  const files = JSON.parse(gunzipSync(compressed, { maxOutputLength: 20 * 1024 * 1024 }).toString("utf8"))
  const encodedFile = Object.hasOwn(files, name) ? files[name] : undefined
  if (typeof encodedFile !== "string") return null
  const body = Buffer.from(encodedFile, "base64")
  return {
    body: name.endsWith(".html") ? Buffer.from(addResearchNavigation(body.toString("utf8"), name, project)) : body,
    contentType,
  }
}
