import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const origin = process.argv[2] || "http://127.0.0.1:3110"
const localEnvironment = await readFile(".env.local", "utf8").catch(() => "")
const password = process.env.ONGOING_RESEARCH_PASSWORD || localEnvironment.match(/^ONGOING_RESEARCH_PASSWORD=(.*)$/m)?.[1]
assert.ok(password, "Configure a local test password")
const root = "/research/ongoing"
const project = `${root}/source-localization`
const presentation = `${project}/presentation`
const privateMarker = "Identifying Neural Source Dynamics"
let checked = 0

async function get(path, headers = {}) {
  return fetch(`${origin}${path}`, { redirect: "manual", headers })
}
async function post(fields, headers = {}) {
  return fetch(`${origin}${root}/session`, {
    method: "POST",
    redirect: "manual",
    headers: { Origin: origin, ...headers },
    body: new URLSearchParams(fields),
  })
}
function noCache(response) {
  assert.match(response.headers.get("cache-control") || "", /no-store/)
  assert.match(response.headers.get("x-robots-tag") || "", /noindex/)
}
function check(label) { checked++; console.log(`PASS ${label}`) }

const login = await get(root)
assert.equal(login.status, 200)
noCache(login)
const loginHTML = await login.text()
assert.ok(loginHTML.includes("spongebob-mind.gif"))
assert.ok(!loginHTML.includes("Open project"))
assert.ok(!loginHTML.includes(privateMarker))
check("Public entry contains GIF/login only and prevents indexing/caching")

for (const route of [project, `${presentation}/index.html`, `${presentation}/index_ru.html`, `${presentation}/NOTATION.md`, `${presentation}/iclr_draft_v3.pdf`, `${presentation}/data_method_overview_editable.png`]) {
  const response = await get(route)
  assert.ok([303, 307].includes(response.status), `Unauthenticated ${route} redirects`)
  assert.ok(response.headers.get("location").includes(root))
  noCache(response)
  assert.ok(!(await response.text()).includes(privateMarker))
}
check("Direct project, EN/RU HTML, notation, PDF, and diagram require a session")

const rsc = await get(project, { RSC: "1", "Next-Router-Prefetch": "1", "x-middleware-subrequest": "middleware:middleware:middleware:middleware:middleware" })
assert.ok(!(await rsc.text()).includes(privateMarker))
const fake = await get(`${presentation}/index.html`, { Cookie: "ongoing_research_session=forged" })
assert.equal(fake.status, 303)
check("Prefetch/subrequest headers and forged cookies cannot reveal presentation data")

const badPassword = await post({ password: `${password}-incorrect` })
assert.equal(badPassword.status, 303)
assert.match(badPassword.headers.get("location"), /error=wrong-password/)
assert.equal(badPassword.headers.get("set-cookie"), null)
const crossOrigin = await post({ password }, { Origin: "https://untrusted.example" })
assert.equal(crossOrigin.status, 403)
check("Wrong passwords and cross-origin login attempts are rejected")

const success = await post({ password, next: project })
assert.equal(success.status, 303)
assert.equal(new URL(success.headers.get("location")).pathname, project)
const setCookie = success.headers.get("set-cookie")
assert.match(setCookie, /HttpOnly/i)
assert.match(setCookie, /SameSite=strict/i)
assert.match(setCookie, /Max-Age=28800/i)
if (origin.startsWith("https:")) assert.match(setCookie, /; Secure/i)
const cookie = setCookie.split(";")[0]
const authHeaders = { Cookie: cookie }
const projects = await get(root, authHeaders)
assert.equal(projects.status, 200)
assert.ok((await projects.text()).includes("Open project"))
check("Correct password creates a scoped session and reveals the projects list")

for (const name of ["index.html", "index_ru.html", "NOTATION.md", "iclr_draft_v3.pdf", "data_method_overview_editable.png"]) {
  const response = await get(`${presentation}/${name}`, authHeaders)
  assert.equal(response.status, 200, name)
  noCache(response)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (name.endsWith(".html")) {
    const html = bytes.toString()
    assert.match(response.headers.get("content-type"), /text\/html/)
    assert.ok(html.includes(`<base href="${presentation}/${name}">`))
    assert.ok(html.includes(`${presentation}/NOTATION.md`))
    assert.ok(html.includes(`${presentation}/iclr_draft_v3.pdf`))
    assert.ok(html.includes(`${presentation}/data_method_overview_editable.png`))
    assert.ok(!html.includes("../writing/output/pdf/"))
    assert.ok(!html.includes("../writing/img/"))
  } else if (name.endsWith(".pdf")) {
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-")
  } else if (name.endsWith(".png")) {
    assert.match(response.headers.get("content-type"), /image\/png/)
    assert.ok(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
  }
}
check("Authenticated EN/RU presentation and linked documents load with protected links")

const missing = await get(`${presentation}/unknown.txt`, authHeaders)
assert.equal(missing.status, 404)
const traversal = await get(`${presentation}/%2e%2e%2f%2e%2e%2f.env.local`, authHeaders)
assert.equal(traversal.status, 404)
const tamperedCookie = `${cookie.slice(0, -1)}${cookie.endsWith("A") ? "B" : "A"}`
assert.equal((await get(`${presentation}/index.html`, { Cookie: tamperedCookie })).status, 303)
assert.equal((await get("/private/ongoing-research.enc")).status, 404)
assert.equal((await get("/.env.local")).status, 404)
check("Unknown files, traversal, tampering, and direct private-file URLs are blocked")

const unknownError = await get(`${root}?error=__proto__`)
assert.equal(unknownError.status, 200)
assert.ok((await unknownError.text()).includes("Enter the password"))
const externalNext = await post({ password, next: "https://untrusted.example" })
assert.equal(new URL(externalNext.headers.get("location")).pathname, root)
const logout = await post({ action: "logout" }, authHeaders)
assert.equal(logout.status, 303)
assert.match(logout.headers.get("set-cookie"), /Max-Age=0/i)
assert.equal((await get(`${presentation}/index.html`)).status, 303)
check("Unknown error values are safe, login cannot redirect externally, and logout clears the session")

if (process.argv.includes("--rate-limit")) {
  for (let index = 0; index < 5; index++) await post({ password: "wrong" })
  const throttled = await post({ password })
  assert.match(throttled.headers.get("location"), /error=rate-limit/)
  check("Repeated failed attempts trigger the per-instance throttle (restart test server to reset)")
}

console.log(`${checked} integration checks passed.`)
