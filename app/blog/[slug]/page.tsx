import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import blogData from "../../../locales/en/blog.json"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.posts.find((p) => p.id === params.slug)

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

          {post.image && (
            <div className="overflow-hidden rounded-lg border border-border/60">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {post.link && (
            <p className="text-sm">
              The book can be downloaded{" "}
              <Link href={post.link} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                here
              </Link>
              .
            </p>
          )}

          {post.repo && (
            <Card className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium">Repository</p>
                  <p className="text-sm text-muted-foreground break-all">{post.repo}</p>
                </div>
                <Button asChild>
                  <Link href={post.repo} target="_blank" rel="noopener noreferrer">
                    View Repo
                  </Link>
                </Button>
              </div>
            </Card>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {post.source && (
            <Card className="p-4">
              <div className="text-sm">
                <p className="font-medium mb-2">Original Sources:</p>
                <div className="space-y-1">
                  {post.source.linkedin && (
                    <Link
                      href={post.source.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      LinkedIn <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                  {post.source.weproject && (
                    <Link
                      href={post.source.weproject}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      WeProject <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          )}
        </article>
      </div>
    </div>
  )
}
