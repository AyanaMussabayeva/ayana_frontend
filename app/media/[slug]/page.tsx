import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import mediaData from "../../../locales/en/media.json"

interface MediaArticlePageProps {
  params: {
    slug: string
  }
}

export default function MediaArticlePage({ params }: MediaArticlePageProps) {
  const article = mediaData.articles.find((a) => a.id === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/media" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> {mediaData.backToMedia}
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {mediaData.publishedOn} {article.date} • {article.publication}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.images.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${article.title} - image ${index + 1}`}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
            ))}
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground italic">{article.excerpt}</p>

            {article.content.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mt-6">
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            ))}

            {article.source && (
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm">
                  <strong>About {article.source.name}:</strong> {article.source.description}
                </p>
              </div>
            )}
          </div>

          {article.source && (
            <div className="mt-8 relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                {/* Gradient borders */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
              </div>
              <div className="relative z-0 p-6 bg-card/50 backdrop-blur-sm rounded-lg">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About {article.source.name}</h3>
                  <p className="text-sm text-muted-foreground">{article.source.description}</p>

                  <div className="flex justify-center mt-6">
                    <Button size="lg" className="relative group overflow-hidden" asChild>
                      <Link
                        href={article.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3"
                      >
                        <span className="relative z-10">Read original article</span>
                        <ExternalLink className="h-4 w-4 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

