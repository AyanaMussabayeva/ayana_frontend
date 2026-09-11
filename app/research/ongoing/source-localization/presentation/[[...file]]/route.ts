import { NextRequest, NextResponse } from "next/server"
import { isResearchAuthenticated, privateResearchHeaders, RESEARCH_PATH, researchRequestOrigin } from "@/lib/ongoing-research"
import { readResearchFile } from "@/lib/ongoing-research-files"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: { file?: string[] } }) {
  if (!(await isResearchAuthenticated())) {
    const url = new URL(RESEARCH_PATH, researchRequestOrigin(request))
    url.searchParams.set("next", `${RESEARCH_PATH}/source-localization`)
    return NextResponse.redirect(url, { status: 303, headers: privateResearchHeaders })
  }

  const name = params.file?.join("/") || "index.html"
  try {
    const file = await readResearchFile(name)
    if (!file) return new NextResponse("Not found", { status: 404, headers: privateResearchHeaders })
    return new NextResponse(new Uint8Array(file.body), {
      headers: {
        ...privateResearchHeaders,
        "Content-Type": file.contentType,
        "Content-Disposition": `inline; filename="${name}"`,
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": file.contentType.startsWith("text/html")
          ? "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'none'"
          : "frame-ancestors 'self'",
      },
    })
  } catch {
    return new NextResponse("This project is temporarily unavailable.", { status: 503, headers: privateResearchHeaders })
  }
}
