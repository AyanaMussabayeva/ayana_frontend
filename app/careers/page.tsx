"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, MessageSquare, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import i18n from "@/lib/i18n"
import { cn } from "@/lib/utils"

const about = i18n.getResourceBundle("en", "about")

export default function AboutPage() {
  // State to track which education items are expanded
  const [expandedEducationItems, setExpandedEducationItems] = useState<Record<number, boolean>>({})
  const [expandedExperienceItems, setExpandedExperienceItems] = useState<Record<number, boolean>>({})

  // Toggle expanded state for education items
  const toggleExpandEducation = (index: number) => {
    setExpandedEducationItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Toggle expanded state for experience items
  const toggleExpandExperience = (index: number) => {
    setExpandedExperienceItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
              {/* Left border */}
              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
              {/* Bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
              {/* Right border */}
              <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-y"></div>
            </div>
            <Card className="relative z-0">
              <CardHeader>
                <CardTitle>Ayana Mussabayeva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{about.sidebar.contact.title}</h3>
                  <div className="space-y-2">
                    <Link
                      href={`mailto:${about.sidebar.contact.email}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {about.sidebar.contact.email}
                    </Link>
                    <Link
                      href={`https://github.com/${about.sidebar.contact.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      {about.sidebar.contact.github}
                    </Link>
                    <Link
                      href={`https://linkedin.com/in/${about.sidebar.contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      {about.sidebar.contact.linkedin}
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{about.sidebar.languages.title}</h3>
                  <div className="space-y-1 text-sm">
                    {about.sidebar.languages.items.map((language, index) => (
                      <p key={index}>{language}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{about.sidebar.skills.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.sidebar.skills.items.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{about.sidebar.awards.title}</h3>
                  <div className="space-y-1 text-sm">
                    {about.sidebar.awards.items.map((award, index) => (
                      <p key={index}>{award}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Card */}
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
            <Card className="relative z-0">
              <CardHeader>
                <CardTitle>{about.sidebar.community.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {about.sidebar.community.items.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.logo && (
                        <div className="flex-shrink-0">
                          <Image
                            src={item.logo || "/placeholder.svg"}
                            alt={`${item.title} logo`}
                            width={120}
                            height={40}
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {item.link && (
                      <Button variant="outline" asChild className="w-full">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center"
                        >
                          {item.linkType === "telegram" ? (
                            <>
                              Join Telegram Channel <MessageSquare className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-6">{about.experience.title}</h2>
            <div className="space-y-6">
              {about.experience.items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "timeline-item relative",
                    !expandedExperienceItems[index] && "pb-1", // Reduce padding when collapsed
                  )}
                >
                  {/* Gradient border for timeline item */}
                  <div className="absolute left-0 top-0.5 h-4 w-4 rounded-full z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                  </div>
                  {/* Gradient line for timeline */}
                  <div className="absolute left-[7px] top-6 bottom-0 w-0.5 z-0 overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 h-full bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y",
                        !expandedExperienceItems[index] && "h-[calc(100%-10px)]", // Shorter line when collapsed
                      )}
                    ></div>
                  </div>
                  <div className="ml-8">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-primary text-sm">
                      {item.company} | {item.period}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{item.location}</p>

                    {/* Show More/Less button */}
                    {item.description.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpandExperience(index)}
                        className="mt-2 text-xs text-primary hover:text-primary/80 p-0 h-auto"
                      >
                        {expandedExperienceItems[index] ? (
                          <span className="flex items-center">
                            Show Less <ChevronUp className="ml-1 h-3 w-3" />
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Show More <ChevronDown className="ml-1 h-3 w-3" />
                          </span>
                        )}
                      </Button>
                    )}

                    {/* Expandable content */}
                    {expandedExperienceItems[index] && (
                      <div className="mt-3 text-sm space-y-2">
                        {item.description.map((desc, i) => (
                          <p key={i} className="text-muted-foreground">
                            {desc}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">{about.education.title}</h2>
            <div className="space-y-6">
              {about.education.items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "timeline-item relative",
                    !expandedEducationItems[index] && "pb-1", // Reduce padding when collapsed
                  )}
                >
                  {/* Gradient border for timeline item */}
                  <div className="absolute left-0 top-0.5 h-4 w-4 rounded-full z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                  </div>
                  {/* Gradient line for timeline */}
                  <div className="absolute left-[7px] top-6 bottom-0 w-0.5 z-0 overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-y",
                        !expandedEducationItems[index] && "h-[calc(100%-10px)]", // Shorter line when collapsed
                      )}
                    ></div>
                  </div>
                  <div className="ml-8">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-primary text-sm">
                      {item.institution} | {item.period}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{item.location}</p>

                    {/* Display the last description item (university info) right after location */}
                    {item.description.length > 0 && (
                      <p className="text-xs text-muted-foreground italic mt-1 mb-1">
                        {item.description[item.description.length - 1]}
                      </p>
                    )}

                    {/* Show More/Less button */}
                    {item.description.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpandEducation(index)}
                        className="mt-0 text-xs text-primary hover:text-primary/80 p-0 h-auto"
                      >
                        {expandedEducationItems[index] ? (
                          <span className="flex items-center">
                            Show Less <ChevronUp className="ml-1 h-3 w-3" />
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Show More <ChevronDown className="ml-1 h-3 w-3" />
                          </span>
                        )}
                      </Button>
                    )}

                    {/* Display the rest of the description items (personal achievements) */}
                    {expandedEducationItems[index] && (
                      <div className="mt-3 text-sm space-y-2">
                        {item.description.slice(0, -1).map((desc, i) => (
                          <p key={i} className="text-muted-foreground">
                            {desc}
                          </p>
                        ))}

                        {/* Add media section inside the expandable content */}
                        {item.media && (
                          <div className="mt-4">
                            {item.title.includes("BEng") || item.title.includes("MPhil") || item.title.includes("MSc") ? (
                              // Grid layout for sections with multiple images
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {item.media.map((mediaItem, mediaIndex) => (
                                    <div key={mediaIndex} className="space-y-2">
                                      <div className="relative rounded-lg overflow-hidden border bg-muted/10 aspect-[4/3]">
                                        <Image
                                          src={mediaItem.url || "/placeholder.svg"}
                                          alt={mediaItem.alt}
                                          width={400}
                                          height={300}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      {mediaItem.caption && (
                                        <p className="text-xs text-muted-foreground italic">{mediaItem.caption}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              // Default vertical layout for other education items
                              <div className="space-y-4">
                                {item.media.map((mediaItem, mediaIndex) => (
                                  <div key={mediaIndex} className="space-y-2">
                                    <div className="relative rounded-lg overflow-hidden border bg-muted/10">
                                      <Image
                                        src={mediaItem.url || "/placeholder.svg"}
                                        alt={mediaItem.alt}
                                        width={600}
                                        height={400}
                                        className="w-full max-w-[500px] h-auto object-cover mx-auto"
                                      />
                                    </div>
                                    {mediaItem.caption && (
                                      <p className="text-xs text-muted-foreground italic">{mediaItem.caption}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
