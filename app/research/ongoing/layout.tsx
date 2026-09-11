import type { Metadata } from "next"
import type { ReactNode } from "react"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Ongoing research | Ayana Mussabayeva",
  description: "A private space for research in progress.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function OngoingResearchLayout({ children }: { children: ReactNode }) {
  return children
}
