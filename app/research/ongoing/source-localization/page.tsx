import { redirect } from "next/navigation"
import { isResearchAuthenticated } from "@/lib/ongoing-research"

export default async function SourceLocalizationPage() {
  if (!(await isResearchAuthenticated())) {
    redirect("/research/ongoing?next=/research/ongoing/source-localization")
  }

  redirect("/research/ongoing/source-localization/presentation/index.html")
}
