import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import blogData from "../../../locales/en/blog.json"

export default function BlogPostPage() {
  const post = blogData.posts.find((p) => p.id === "joining-mbzuai")

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> {blogData.backToBlog}
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {blogData.publishedOn} {post.date}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {post.videoId && (
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                {/* Gradient borders */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
              </div>
              <div className="relative z-0 p-4 bg-card rounded-lg">
                <div className="aspect-video">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${post.videoId}?si=S_u16WWt37xq-gu1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

