import type React from "react"
import { CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Code, Headphones, Mic, User, FileText } from "lucide-react"
import i18n from "@/lib/i18n"

const home = i18n.getResourceBundle("en", "home")
const blog = i18n.getResourceBundle("en", "blog")

export default function Home() {
  // Add blog to quick links
  const quickLinks = [...home.quickLinks.cards]

  // Insert blog after research
  quickLinks.splice(2, 0, {
    title: "Blog",
    description: "Thoughts and insights on AI, research, and technology",
    href: "/blog",
  })

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{home.hero.title}</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{home.hero.subtitle}</p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/about">
                  {home.hero.buttons.viewResume} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/research">{home.hero.buttons.researchWork}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter mb-8 text-center">{home.quickLinks.title}</h2>
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

              return (
                <QuickLinkCard
                  key={index}
                  icon={icons[index]}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Latest Blog Post Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tighter">Latest Blog Post</h2>
            <p className="text-muted-foreground">Read my latest thoughts and insights</p>
          </div>

          {blog.posts.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link href={`/blog/${blog.posts[0].id}`} className="hover:text-primary transition-colors">
                      {blog.posts[0].title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {blog.posts[0].date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{blog.posts[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.posts[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/blog/${blog.posts[0].id}`}>{blog.readMore}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Brief Bio Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-4">{home.bio.title}</h2>
              {home.bio.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
              <Button asChild variant="outline">
                <Link href="/about">{home.bio.button}</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-6">
                <h3 className="font-medium mb-2">{home.bio.researchInterests.title}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {home.bio.researchInterests.interests.map((interest, index) => (
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

interface QuickLinkCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function QuickLinkCard({ icon, title, description, href }: QuickLinkCardProps) {
  return (
    <Link href={href} className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
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

