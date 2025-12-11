import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import blogData from "../../locales/en/blog.json"

export default function BlogPage() {
  // Get the first post (newest) for featured display
  const featuredPost = blogData.posts[0]
  // Get the rest of the posts
  const otherPosts = blogData.posts.slice(1)

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{blogData.title}</h1>
          <p className="text-muted-foreground">{blogData.description}</p>
        </div>

        {/* Featured Post with Video */}
        {featuredPost && (
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
              {/* Left border */}
              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
              {/* Bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
              {/* Right border */}
              <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
            </div>
            <Card className="relative z-0 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">
                    {featuredPost.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {featuredPost.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredPost.videoId && (
                  <div className="mb-4 aspect-video">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${featuredPost.videoId}?si=S_u16WWt37xq-gu1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </div>
                )}
                {!featuredPost.videoId && featuredPost.image && (
                  <div className="mb-4">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-lg"
                      priority
                      sizes="100vw"
                    />
                  </div>
                )}
                <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                {featuredPost.link && (
                  <p className="text-sm">
                    The book can be downloaded{" "}
                    <Link href={featuredPost.link} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                      here
                    </Link>
                    .
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.id}`}>{blogData.readMore}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Other Posts */}
        <div className="space-y-6">
          {otherPosts.map((post) => (
            <div key={post.id} className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                {/* Top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                {/* Left border */}
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                {/* Right border */}
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
              </div>
              <Card className="relative z-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.videoId && (
                    <div className="mb-4 aspect-video">
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
                  )}
                  {!post.videoId && post.image && (
                    <div className="mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded-lg"
                        sizes="100vw"
                      />
                    </div>
                  )}
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/blog/${post.id}`}>{blogData.readMore}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
