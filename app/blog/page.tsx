import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import blogData from "../../locales/en/blog.json"

export default function BlogPage() {
  const featuredPost = blogData.posts[0]
  const otherPosts = blogData.posts.slice(1)

  const Media = ({ post }: { post: (typeof blogData.posts)[number] }) => {
    if (post.videoId) {
      return (
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
            className="w-full h-full"
          ></iframe>
        </div>
      )
    }

    if (post.image) {
      return (
        <div className="w-full h-full">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={1200}
            className="w-full h-full object-cover"
            sizes="(min-width: 768px) 320px, 100vw"
            priority={post === featuredPost}
          />
        </div>
      )
    }

    return null
  }

  const PostCard = ({ post }: { post: (typeof blogData.posts)[number] }) => {
    const hasMedia = Boolean(post.videoId || post.image)

    return (
      <div className="relative rounded-lg overflow-hidden">
        <div className="absolute inset-0 rounded-lg overflow-hidden z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-y"></div>
        </div>
        <Card className="relative z-0 overflow-hidden border border-border/70 shadow-sm rounded-lg">
          <div
            className={`grid ${hasMedia ? "grid-cols-1 md:grid-cols-[2fr_3fr]" : "grid-cols-1"} gap-4 md:gap-6 items-stretch`}
          >
            {hasMedia && (
              <div className="relative bg-muted/20">
                <Media post={post} />
              </div>
            )}
            <div className="p-4 md:p-6 space-y-4 flex flex-col">
              <div className="space-y-2">
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {post.date}
                </CardDescription>
              </div>
              <p className="text-muted-foreground">{post.excerpt}</p>
              {post.link && (
                <p className="text-sm">
                  The book can be downloaded{" "}
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    here
                  </Link>
                  .
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="pt-2 mt-auto">
                <Button asChild>
                  <Link href={`/blog/${post.id}`}>{blogData.readMore}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{blogData.title}</h1>
          <p className="text-muted-foreground">{blogData.description}</p>
        </div>

        {featuredPost && <PostCard post={featuredPost} />}

        <div className="space-y-6">
          {otherPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
