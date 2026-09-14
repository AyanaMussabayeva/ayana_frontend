import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { gzipSync, gunzipSync } from "node:zlib"

// Only encrypted output is written to this repository. Never place originals in public/.
const source = process.argv[2]
if (!source) throw new Error("Usage: node scripts/package-ongoing-research.mjs /path/to/presentation [--html-only]")
const htmlOnly = process.argv.includes("--html-only")
const environmentFile = await readFile(".env.local", "utf8").catch(() => "")
const localSecret = environmentFile.match(/^ONGOING_RESEARCH_SECRET=(.+)$/m)?.[1]?.trim()
const secret = process.env.ONGOING_RESEARCH_SECRET || localSecret
if (!secret || !/^[A-Za-z0-9+/]{43}=$/.test(secret)) throw new Error("Set ONGOING_RESEARCH_SECRET before packaging")
const key = Buffer.from(secret, "base64")
if (key.length !== 32) throw new Error("Research key must contain 32 random bytes")

const prefix = "/research/ongoing/source-localization/presentation/"
const files = {}
for (const name of ["index.html", "index_ru.html"]) {
  let html = await readFile(path.join(source, name), "utf8")
  html = html.replace(/<head>/i, `<head>\n<base href="${prefix}${name}">\n<meta name="robots" content="noindex, nofollow, noarchive">\n<meta name="referrer" content="no-referrer">`)
  html = html.replaceAll("../NOTATION.md", `${prefix}NOTATION.md`)
    .replaceAll("../writing/output/pdf/iclr_draft_v3.pdf", `${prefix}iclr_draft_v3.pdf`)
    .replaceAll("../writing/img/data_method/data_method_overview_editable.png", `${prefix}data_method_overview_editable.png`)
    .replaceAll(" The local PDF link requires the original project folder.", "")
    .replaceAll(" Ссылка на PDF работает при наличии исходной папки проекта.", "")
    .replaceAll("Открыть локальный PDF статьи v3", "Открыть PDF статьи v3")
  // A native select has its new value before change fires; track which matrix
  // populated the dependent row/column options so switching matrices rebuilds them.
  html = html.replace(
    "const changed = matrixSelect.value !== key || !$('matrix-explorer-row-select').options.length;\n    matrixSelect.value = key;",
    "const changed = matrixSelect.dataset.optionsMatrix !== key || !$('matrix-explorer-row-select').options.length;\n    matrixSelect.value = key;\n    matrixSelect.dataset.optionsMatrix = key;",
  )
  files[name] = Buffer.from(html).toString("base64")
}
if (htmlOnly) {
  const previous = await readFile("private/ongoing-research.enc")
  if (previous.subarray(0, 4).toString() !== "ARP1") throw new Error("Invalid existing research bundle")
  const decipher = createDecipheriv("aes-256-gcm", key, previous.subarray(4, 16))
  decipher.setAuthTag(previous.subarray(16, 32))
  const compressed = Buffer.concat([decipher.update(previous.subarray(32)), decipher.final()])
  const existingFiles = JSON.parse(gunzipSync(compressed, { maxOutputLength: 20 * 1024 * 1024 }).toString("utf8"))
  for (const name of ["NOTATION.md", "iclr_draft_v3.pdf"]) {
    if (typeof existingFiles[name] !== "string") throw new Error(`Missing existing document: ${name}`)
    files[name] = existingFiles[name]
  }
} else {
  files["NOTATION.md"] = (await readFile(path.resolve(source, "../NOTATION.md"))).toString("base64")
  files["iclr_draft_v3.pdf"] = (await readFile(path.resolve(source, "../writing/output/pdf/iclr_draft_v3.pdf"))).toString("base64")
}

files["data_method_overview_editable.png"] = (await readFile(path.resolve(source, "../writing/img/data_method/data_method_overview_editable.png"))).toString("base64")

const iv = randomBytes(12)
const cipher = createCipheriv("aes-256-gcm", key, iv)
const ciphertext = Buffer.concat([cipher.update(gzipSync(JSON.stringify(files))), cipher.final()])
const bundle = Buffer.concat([Buffer.from("ARP1"), iv, cipher.getAuthTag(), ciphertext])
await mkdir("private", { recursive: true })
await writeFile("private/ongoing-research.enc", bundle)
console.log(`Packaged ${Object.keys(files).length} protected files (${bundle.length} encrypted bytes).${htmlOnly ? " Updated HTML; preserved existing documents." : ""}`)
