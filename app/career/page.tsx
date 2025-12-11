import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import careerData from "@/locales/en/career.json"

type ExperienceItem = {
  title: string
  company: string
  period: string
  location: string
  description?: string
  responsibilities: string[]
  skills: string[]
}

type CommunityItem = {
  title: string
  organization: string
  description: string
  skills: string[]
  link?: string
  linkType?: "telegram" | "website"
  logo?: string
}

type CareerContent = {
  title: string
  description: string
  experience: {
    title: string
    items: ExperienceItem[]
  }
  community: {
    title: string
    items: CommunityItem[]
  }
}

const career = careerData as CareerContent

export default function CareerPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{career.title}</h1>
          <p className="text-muted-foreground">{career.description}</p>
        </div>

        {/* Experience Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{career.experience.title}</h2>
          <div className="space-y-6">
            {career.experience.items.map((item, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                  {/* Gradient borders */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
                </div>
                <Card className="relative z-0">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      {item.company} • {item.period} • {item.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="list-disc pl-4 space-y-2">
                        {item.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {resp}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{career.community.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {career.community.items.map((item, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                  {/* Gradient borders */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-y"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-y"></div>
                </div>
                <Card className="relative z-0 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{item.organization}</CardTitle>
                        <CardDescription>{item.title}</CardDescription>
                      </div>
                      {item.logo && (
                        <div className="flex-shrink-0">
                          <Image
                            src={item.logo || "/placeholder.svg"}
                            alt={`${item.organization} logo`}
                            width={120}
                            height={40}
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {item.link && (
                      <Button variant="outline" asChild className="w-full mt-2">
                        <Link href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.linkType === "telegram" ? (
                            <>
                              Join Telegram Channel <MessageSquare className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Link>
                      </Button>
                    )}
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
