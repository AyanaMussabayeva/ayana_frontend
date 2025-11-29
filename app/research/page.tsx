"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, Quote, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import i18n from "@/lib/i18n"
import { YouTubeEmbed } from "@/app/components/youtube-embed"
import Image from "next/image"

const research = i18n.getResourceBundle("en", "research")

export default function ResearchPage() {
  // State to track which publications are expanded
  const [expandedPublications, setExpandedPublications] = useState<Record<number, boolean>>({})

  // Toggle expanded state for a publication
  const toggleExpand = (index: number) => {
    setExpandedPublications((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Best of my Research</h1>
          <p className="text-muted-foreground">
            My research focuses on causal representation learning, signal processing and machine learning algorithms for
            different applications, mainly medicine, neuroscience and brain-computer interfaces.
          </p>

          {/* Academic Profiles Section */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="https://orcid.org/0000-0002-5303-199X"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Image
                src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
                alt="ORCID logo"
                width={16}
                height={16}
              />
              <span className="font-mono">0000-0002-5303-199X</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="https://scholar.google.com/citations?user=56zYG1kAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <span>Google Scholar</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">{research.publications.title}</h2>
          <div className="space-y-6">
            {research.publications.items.map((publication, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                  {/* Top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-x"></div>
                  {/* Left border */}
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-y"></div>
                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-x"></div>
                  {/* Right border */}
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-y"></div>
                </div>
                <Card className="relative z-0">
                  <CardHeader>
                    <CardTitle>{publication.title}</CardTitle>
                    <CardDescription>
                      {publication.conference} • {publication.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Authors section - always visible */}
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{publication.authors}</p>
                    </div>

                    {/* Show More/Less Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(index)}
                      className="text-xs text-primary hover:text-primary/80 p-0 h-auto"
                    >
                      {expandedPublications[index] ? (
                        <span className="flex items-center">
                          Show Less <ChevronUp className="ml-1 h-3 w-3" />
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Show More <ChevronDown className="ml-1 h-3 w-3" />
                        </span>
                      )}
                    </Button>

                    {/* Expandable content */}
                    <div
                      className={cn(
                        "space-y-4 overflow-hidden transition-all duration-300",
                        expandedPublications[index] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{publication.description}</p>

                      {/* Video embed if available */}
                      {publication.videoId && (
                        <div className="relative rounded-lg overflow-hidden">
                          <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                            {/* Gradient borders */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                            <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
                          </div>
                          <div className="relative z-0 p-4 bg-card rounded-lg">
                            <YouTubeEmbed videoId={publication.videoId} title={publication.title} />
                          </div>
                        </div>
                      )}

                      {/* Citation section */}
                      <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-md">
                        <Quote className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground font-mono">{publication.citation}</p>
                          {publication.citationCount && (
                            <p className="text-xs text-primary font-medium">Cited by: {publication.citationCount}</p>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {publication.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* View Publication Button */}
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={publication.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          View Publication <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">{research.interests.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {research.interests.items.map((interest, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                  {/* Top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                  {/* Left border */}
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-y"></div>
                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                  {/* Right border */}
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-y"></div>
                </div>
                <Card className="relative z-0 h-full">
                  <CardHeader>
                    <CardTitle>{interest.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

