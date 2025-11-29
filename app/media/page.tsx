import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import mediaData from "../../locales/en/media.json"

export default function MediaPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{mediaData.title}</h1>
          <p className="text-muted-foreground">{mediaData.description}</p>
        </div>

        <section className="space-y-8">
          {mediaData.articles.map((article, articleIndex) => (
            <div key={article.id} className="relative rounded-lg overflow-hidden">
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
              <Card className="relative z-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link href={`/media/${article.id}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {article.date} • {article.publication}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.images.slice(0, 2).map((image, index) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${article.title} - image ${index + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-48"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild>
                    <Link href={`/media/${article.id}`}>
                      {mediaData.readMore} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

