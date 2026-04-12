import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Code, Headphones, Mic, User, FileText, Send, Calendar, PlayCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import homeData from "../locales/en/home.json"
import blogData from "../locales/en/blog.json"

interface QuickLinkCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function QuickLinkCard({ icon, title, description, href }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md z-0 block"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowRight className="h-4 w-4 text-primary" />
      </div>
    </Link>
  )
}

function FeaturedPostMedia({ post }: { post: (typeof blogData.posts)[number] }) {
  if (post.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    )
  }

  if (post.videoId) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={`https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-sm font-medium shadow-sm">
          <PlayCircle className="h-4 w-4 text-primary" />
          Video preview
        </div>
      </div>
    )
  }

  return null
}

export default function Home() {
  const quickLinks = homeData.quickLinks.cards
    .filter((card) => card.title !== "About Me")
    .map((card) => ({ ...card }))
  const featuredPosts = blogData.posts.slice(0, 3)

  quickLinks.splice(2, 0, {
    title: "Blog",
    description: "Thoughts and insights on AI, research, and technology",
    href: "/blog",
  })

  // Make sure all links have valid href values
  quickLinks.forEach((link) => {
    if (link.title === "Career") {
      link.href = "/about"
    } else if (!link.href.startsWith("/")) {
      link.href = `/${link.href}`
    }
  })

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-14 md:py-16 bg-gradient-to-b from-muted/40 via-background to-background relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,129,251,0.12),_transparent_32%),radial-gradient(circle_at_25%_40%,_rgba(236,81,171,0.12),_transparent_28%),radial-gradient(circle_at_70%_30%,_rgba(0,181,201,0.14),_transparent_30%),radial-gradient(circle_at_80%_75%,_rgba(246,237,60,0.08),_transparent_26%)]" />
        {/* Floating animated dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            className="absolute h-3 w-3 rounded-full bg-primary/70 blur-sm animate-jelly left-[20%] top-[25%]"
            style={{ animationDelay: "0s", animationDuration: "14s" }}
          />
          <span
            className="absolute h-2 w-2 rounded-full bg-fuchsia-400/80 blur-sm animate-jelly left-[70%] top-[35%]"
            style={{ animationDelay: "2s", animationDuration: "16s" }}
          />
          <span
            className="absolute h-2.5 w-2.5 rounded-full bg-cyan-400/80 blur-sm animate-jelly left-[45%] top-[60%]"
            style={{ animationDelay: "4s", animationDuration: "18s" }}
          />
          <span
            className="absolute h-3 w-3 rounded-full bg-amber-300/70 blur-sm animate-jelly left-[15%] top-[70%]"
            style={{ animationDelay: "6s", animationDuration: "20s" }}
          />
          <span
            className="absolute h-2 w-2 rounded-full bg-emerald-300/70 blur-sm animate-jelly left-[60%] top-[15%]"
            style={{ animationDelay: "8s", animationDuration: "22s" }}
          />
        </div>
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="relative w-full max-w-lg md:max-w-md flex justify-center">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/25 via-fuchsia-500/15 to-cyan-400/15 blur-3xl rounded-full" />
              <div className="relative overflow-hidden rounded-full border border-border/60 shadow-xl w-64 h-64 md:w-72 md:h-72">
                <Image
                  src="/misc/ayana.jpg"
                  alt="Ayana Mussabayeva"
                  width={576}
                  height={576}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                Welcome to my site
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Hi! I'm Ayana Mussabayeva.
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  I'm an AI researcher interested in fundamental machine learning and its applications, especially in
                  neuroscience. Alongside research, I&apos;ve spent part of my career building teams and leading AI
                  work as Head of AI/ML and CTO, and I&apos;m a co-founder of DSML.KZ, the largest AI community in
                  Central Asia. Welcome to my webpage!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button asChild>
                  <Link href="/careers">
                    View careers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/research">Research work</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="https://t.me/ayana_mussabayeva" target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2 h-4 w-4" />
                    Telegram
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex justify-center md:justify-end">
            <Button variant="outline" asChild>
              <Link href="/blog">View all posts</Link>
            </Button>
          </div>

          {featuredPosts.length > 0 && (
            <div className="mx-auto max-w-6xl px-4 md:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: featuredPosts.length > 3,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {featuredPosts.map((post) => (
                    <CarouselItem key={post.id} className="md:basis-1/2 xl:basis-1/3">
                      <div className="h-full relative rounded-lg overflow-hidden">
                        <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
                        </div>
                        <Card className="group relative z-0 flex h-full flex-col overflow-hidden">
                          {(post.image || post.videoId) && (
                            <Link href={`/blog/${post.id}`} className="block">
                              <FeaturedPostMedia post={post} />
                            </Link>
                          )}
                          <CardHeader className="space-y-3 pb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                            <CardTitle className="text-xl leading-snug">
                              <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                                {post.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 space-y-4">
                            <p className="text-muted-foreground">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild>
                              <Link href={`/blog/${post.id}`}>
                                {blogData.readMore} <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-6" />
                <CarouselNext className="-right-4 md:-right-6" />
              </Carousel>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter mb-8 text-center">{homeData.quickLinks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quickLinks.map((card, index) => {
              const icons = [
                <User key="user" className="h-6 w-6" />,
                <BookOpen key="book" className="h-6 w-6" />,
                <FileText key="blog" className="h-6 w-6" />,
                <Mic key="mic" className="h-6 w-6" />,
                <Headphones key="headphones" className="h-6 w-6" />,
                <Code key="code" className="h-6 w-6" />,
                <User key="user2" className="h-6 w-6" />,
              ]

              const gradientClasses = [
                {
                  top: "from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB]",
                  left: "from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB]",
                  bottom: "from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C]",
                  right: "from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9]",
                },
                {
                  top: "from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C]",
                  left: "from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C]",
                  bottom: "from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9]",
                  right: "from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB]",
                },
                {
                  top: "from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9]",
                  left: "from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9]",
                  bottom: "from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB]",
                  right: "from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C]",
                },
              ]

              const gradientSet = gradientClasses[index % 3]

              return (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientSet.top} animate-gradient-x`}
                    ></div>
                    <div
                      className={`absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b ${gradientSet.left} animate-gradient-y`}
                    ></div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientSet.bottom} animate-gradient-x`}
                    ></div>
                    <div
                      className={`absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b ${gradientSet.right} animate-gradient-y`}
                    ></div>
                  </div>
                  <QuickLinkCard
                    key={`card-${index}`}
                    icon={icons[index]}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brief Bio Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                {/* Top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                {/* Left border */}
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-y"></div>
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                {/* Right border */}
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-y"></div>
              </div>
              <div className="relative z-0 p-6">
                <h2 className="text-2xl font-bold tracking-tighter mb-4">
                  Currently doing research at MBZUAI, Abu-Dhabi
                </h2>
                <p className="text-muted-foreground mb-4">
                  Currently I'm pursuing a PhD in Machine Learning at Mohamed bin Zayed University of Artificial
                  Intelligence. My main research interests now cover causal representation learning, brain data
                  analysis, causal AI and medical applications of AI.
                </p>
                <p className="text-muted-foreground mb-4">
                  I am also working as a Head of Engineering on contract basis at a startup GreenEye Ltd, where I
                  contribute to the vision of the product and lead multiple engineering teams.
                </p>
                <Button asChild variant="outline">
                  <Link href="/about">{homeData.bio.button}</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                {/* Top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-x"></div>
                {/* Left border */}
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-y"></div>
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-x"></div>
                {/* Right border */}
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-y"></div>
              </div>
              <div className="relative rounded-lg border bg-card p-6 z-0">
                <h3 className="font-medium mb-2">{homeData.bio.researchInterests.title}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {homeData.bio.researchInterests.interests.map((interest, index) => (
                    <li key={index}>• {interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
