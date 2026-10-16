import { redirect } from "next/navigation"
import { isResearchAuthenticated } from "@/lib/ongoing-research"

export default async function SameImagesDifferentHeadsetsPage() {
  if (!(await isResearchAuthenticated())) {
    redirect("/research/ongoing?next=/research/ongoing/same-images-different-headsets")
  }

  redirect("/research/ongoing/same-images-different-headsets/presentation/index.html")
}
