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
  return { body: Buffer.from(encodedFile, "base64"), contentType: contentTypes[name] }
}
