import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isResearchAuthenticated } from "@/lib/ongoing-research"
import { LogoutButton } from "../logout-button"

export default async function SourceLocalizationPage() {
  if (!(await isResearchAuthenticated())) {
    redirect("/research/ongoing?next=/research/ongoing/source-localization")
  }

  return (
    <div className="px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/research/ongoing"
            prefetch={false}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <a
                href="/research/ongoing/source-localization/presentation/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open presentation
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">in a new tab</span>
              </a>
            </Button>
            <LogoutButton />
          </div>
        </div>
        <h1 className="sr-only">Source Localization</h1>
        <iframe
          src="/research/ongoing/source-localization/presentation/index.html"
          title="Source Localization research presentation"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="block h-[calc(100dvh-10rem)] min-h-[34rem] w-full rounded-xl border bg-background"
        />
      </div>
    </div>
  )
}
