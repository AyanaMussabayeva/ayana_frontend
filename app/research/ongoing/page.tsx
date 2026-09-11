import Image from "next/image"
import Link from "next/link"
import { Activity, ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react"
import {
  isResearchAuthenticated,
  isResearchConfigured,
  safeResearchReturnPath,
} from "@/lib/ongoing-research"
import { LoginForm } from "./login-form"
import { LogoutButton } from "./logout-button"

type OngoingResearchPageProps = {
  searchParams?: { next?: string | string[]; error?: string | string[] }
}

export default async function OngoingResearchPage({ searchParams }: OngoingResearchPageProps) {
  const authenticated = await isResearchAuthenticated()

  if (!authenticated) {
    return (
      <div className="container px-4 py-8">
        <div className="mx-auto max-w-md">
          <Link
            href="/research"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to research
          </Link>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="h-1 bg-gradient-to-r from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB]" />
            <div className="space-y-5 p-6">
              <div className="space-y-2 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                  A little mystery inside
                </span>
                <h1 className="text-3xl font-bold tracking-tight">Ongoing research</h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ideas, experiments, and projects in progress.
                  <br />
                  Enter the password to take a look.
                </p>
              </div>
              <Image
                src="/misc/spongebob-mind.gif"
                alt="SpongeBob and Patrick: The inner machinations of my mind are an enigma."
                width={220}
                height={141}
                unoptimized
                priority
                className="mx-auto h-auto w-full max-w-[280px] rounded-lg border"
              />
              <LoginForm
                next={safeResearchReturnPath(searchParams?.next)}
                error={typeof searchParams?.error === "string" ? searchParams.error : undefined}
                configured={isResearchConfigured()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Research
          </Link>
          <LogoutButton />
        </div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
            Private research space
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ongoing research</h1>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            A look inside the work in progress. These projects are still evolving, from early ideas to the latest experiments.
          </p>
        </div>
        <section aria-label="Research projects">
          <a
            href="/research/ongoing/source-localization"
            className="group relative block overflow-hidden rounded-xl border bg-card p-6 transition-colors hover:border-primary/60 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB]" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Activity className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                In progress
              </span>
            </div>
            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Source Localization</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Explore the current project presentation, methods, and experiments.
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Open project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </a>
        </section>
      </div>
    </div>
  )
}
