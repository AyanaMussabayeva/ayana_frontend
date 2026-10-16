import { createCipheriv, randomBytes } from "node:crypto"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { gzipSync } from "node:zlib"

// Only encrypted output is written to this repository. Never place originals in public/.
const source = process.argv[2]
if (!source) throw new Error("Usage: node scripts/package-same-images-research.mjs /path/to/paper/web")
const environmentFile = await readFile(".env.local", "utf8").catch(() => "")
const localSecret = environmentFile.match(/^ONGOING_RESEARCH_SECRET=(.+)$/m)?.[1]?.trim()
const secret = process.env.ONGOING_RESEARCH_SECRET || localSecret
if (!secret || !/^[A-Za-z0-9+/]{43}=$/.test(secret)) throw new Error("Set ONGOING_RESEARCH_SECRET before packaging")
const key = Buffer.from(secret, "base64")
if (key.length !== 32) throw new Error("Research key must contain 32 random bytes")

const prefix = "/research/ongoing/same-images-different-headsets/presentation/"
const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<base href="${prefix}index.html">
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="referrer" content="no-referrer">`

let html = await readFile(path.join(source, "index.html"), "utf8")
if (/<head[\s>]/i.test(html)) {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n${head}`)
} else {
  // The presentation is a document fragment (head elements, then body content); give it a full document.
  const bodyStart = html.search(/<a class="skip-link"|<header[\s>]/i)
  if (bodyStart < 0) throw new Error("Could not find where the presentation body starts")
  html = `<!doctype html>\n<html lang="en">\n<head>\n${head}\n${html.slice(0, bodyStart)}</head>\n<body>\n${html.slice(bodyStart)}\n</body>\n</html>\n`
}

const files = { "index.html": Buffer.from(html).toString("base64") }
const figures = [...new Set([...html.matchAll(/["'](img\/[a-z0-9_]+\.png)["']/g)].map((match) => match[1]))]
for (const figure of figures) {
  files[figure] = (await readFile(path.join(source, figure))).toString("base64")
}

const iv = randomBytes(12)
const cipher = createCipheriv("aes-256-gcm", key, iv)
const ciphertext = Buffer.concat([cipher.update(gzipSync(JSON.stringify(files))), cipher.final()])
const bundle = Buffer.concat([Buffer.from("ARP1"), iv, cipher.getAuthTag(), ciphertext])
await mkdir("private", { recursive: true })
await writeFile("private/same-images-different-headsets.enc", bundle)
console.log(`Packaged ${Object.keys(files).length} protected files (${bundle.length} encrypted bytes).`)
