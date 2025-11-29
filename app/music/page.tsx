"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { ChevronRight, Music, Music2 } from "lucide-react"
import { Carousel } from "../standup/carousel"
import { InstagramWrapper } from "../embedded/instagram-wrapper"
import i18n from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Dynamically import Instagram embeds
import MusicEng1 from "../embedded/music/eng/1"
import MusicEng2 from "../embedded/music/eng/2"
import MusicEng3 from "../embedded/music/eng/3"
import MusicEng4 from "../embedded/music/eng/4"

import MusicRu1 from "../embedded/music/ru/1"
import MusicRu2 from "../embedded/music/ru/2"
import MusicRu3 from "../embedded/music/ru/3"
import MusicRu4 from "../embedded/music/ru/4"
import MusicRu5 from "../embedded/music/ru/5"
import MusicRu6 from "../embedded/music/ru/6"

import MusicKz1 from "../embedded/music/kz/1"

const music = i18n.getResourceBundle("en", "music")

type MusicPlatform = "apple" | "spotify"

export default function MusicPage() {
  const [platform, setPlatform] = useState<MusicPlatform>("apple")

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Best of my Music</h1>
          <p className="text-muted-foreground">
            From my early childhood I loved singing. My mom brought me to music school at the age of 5 where I started
            playing violin and piano. Later I started writing music in my free time as a hobby.
          </p>
        </div>

        <Script
          src="https://www.instagram.com/embed.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.instgrm) {
              window.instgrm.Embeds.process()
              setTimeout(() => {
                if (window.instgrm) {
                  window.instgrm.Embeds.process()
                }
              }, 2000)
            }
          }}
        />

        {/* Featured Tracks Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">{music.embeds.title}</h2>

            {/* Platform Toggle */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-y"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-y"></div>
              </div>
              <div className="relative z-0 bg-card rounded-lg p-1 flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPlatform("apple")}
                  className={cn(
                    "flex items-center gap-2 rounded-md transition-colors",
                    platform === "apple" ? "bg-primary/20 text-primary" : "hover:bg-muted",
                  )}
                >
                  <Music className="h-4 w-4" />
                  <span>Apple Music</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPlatform("spotify")}
                  className={cn(
                    "flex items-center gap-2 rounded-md transition-colors",
                    platform === "spotify" ? "bg-primary/20 text-primary" : "hover:bg-muted",
                  )}
                >
                  <Music2 className="h-4 w-4" />
                  <span>Spotify</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {music.embeds.items.map((embed, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
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
                <div className="relative bg-card rounded-lg p-4 z-0">
                  <h3 className="text-lg font-medium mb-4">{embed.title}</h3>

                  {platform === "apple" ? (
                    <iframe
                      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                      frameBorder="0"
                      height="175"
                      style={{
                        width: "100%",
                        maxWidth: "660px",
                        overflow: "hidden",
                        borderRadius: "10px",
                      }}
                      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                      src={`${embed.src}${embed.src.includes("?") ? "&" : "?"}theme=dark`}
                      title={`Apple Music: ${embed.title}`}
                    ></iframe>
                  ) : (
                    <iframe
                      style={{
                        borderRadius: "12px",
                        width: "100%",
                        height: "175px",
                      }}
                      src={embed.spotifySrc}
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify: ${embed.title}`}
                    ></iframe>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* English Songs Carousel Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Songwriting in English</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>Swipe to see more</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <Carousel>
            <InstagramWrapper>
              <MusicEng1 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicEng2 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicEng3 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicEng4 />
            </InstagramWrapper>
          </Carousel>
        </section>

        {/* Russian Songs Carousel Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Songwriting in Russian</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>Swipe to see more</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <Carousel>
            <InstagramWrapper>
              <MusicRu1 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicRu2 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicRu3 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicRu4 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicRu5 />
            </InstagramWrapper>
            <InstagramWrapper>
              <MusicRu6 />
            </InstagramWrapper>
          </Carousel>
        </section>

        {/* Kazakh Songs Carousel Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Kazakh Music</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span>Swipe to see more</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <Carousel>
            <InstagramWrapper>
              <MusicKz1 />
            </InstagramWrapper>
          </Carousel>
        </section>
      </div>
    </div>
  )
}

