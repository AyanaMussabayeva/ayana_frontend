import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Article Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, the media article you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/media">Back to Media</Link>
        </Button>
      </div>
    </div>
  )
}

