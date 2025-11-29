"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { ChevronRight, Calendar, MapPin } from "lucide-react"
import { Carousel } from "./carousel"
import { InstagramWrapper } from "../embedded/instagram-wrapper"
import Image from "next/image"
import { ImageModal } from "./image-modal"

// English standup imports
import { EnglishInstagramEmbed1 } from "../embedded/standup/eng/1"
import { EnglishInstagramEmbed2 } from "../embedded/standup/eng/2"
import { EnglishInstagramEmbed3 } from "../embedded/standup/eng/3"
import { EnglishInstagramEmbed4 } from "../embedded/standup/eng/4"
import { EnglishInstagramEmbed5 } from "../embedded/standup/eng/5"
import { EnglishInstagramEmbed6 } from "../embedded/standup/eng/6"
import { EnglishInstagramEmbed7 } from "../embedded/standup/eng/7"
import { EnglishInstagramEmbed8 } from "../embedded/standup/eng/8"

// Russian standup imports
import { RussianInstagramEmbed1 } from "../embedded/standup/ru/1"
import { RussianInstagramEmbed2 } from "../embedded/standup/ru/2"
import { RussianInstagramEmbed3 } from "../embedded/standup/ru/3"
import { RussianInstagramEmbed4 } from "../embedded/standup/ru/4"

export default function StandupPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState({
    url: "",
    alt: "",
  })

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  const openImageModal = (imageUrl: string, altText: string) => {
    setSelectedImage({ url: imageUrl, alt: altText })
    setModalOpen(true)
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Best of my Standup Comedy</h1>
          <p className="text-muted-foreground">
            In my free time, I perform standup comedy in English and Russian. It is a passion of mine, which gives me a
            platform to express my thoughts and emotions on a wide range of topics. Moreover, standup has introduced me
            to a diverse community of fascinating people from various backgrounds.
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

        <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-8">
          <div className="space-y-8">
            {/* Left Column - Standup Career Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Standup Career</h2>

              {/* Residencies Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Comedy Residencies</h3>
                <div className="space-y-3">
                  {/* FacePalm Standup - WITH GRADIENT BORDER */}
                  <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                      {/* Top border */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                      {/* Left border */}
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                      {/* Bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Right border */}
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                    </div>
                    <div className="relative bg-card rounded-lg p-3 h-full z-0">
                      <h4 className="font-medium text-base">FacePalm Standup</h4>
                      <p className="text-primary text-xs font-medium mt-1">Resident (2024-2025)</p>
                      <p className="text-muted-foreground text-xs mt-1">Dubai, UAE</p>
                    </div>
                  </div>

                  {/* Standup Night Comedy Club - WITH GRADIENT BORDER */}
                  <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                      {/* Top border */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Left border */}
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                      {/* Right border */}
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-x"></div>
                    </div>
                    <div className="relative bg-card rounded-lg p-3 h-full z-0">
                      <h4 className="font-medium text-base">"Standup Night" Comedy Club</h4>
                      <p className="text-primary text-xs font-medium mt-1">Resident (2019-2021)</p>
                      <p className="text-muted-foreground text-xs mt-1">Nazarbayev University, Astana, Kazakhstan</p>
                    </div>
                  </div>

                  {/* Funlife Student Comedy Club - WITH GRADIENT BORDER */}
                  <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                      {/* Top border */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-x"></div>
                      {/* Left border */}
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#F6ED3C] to-[#00B5C9] animate-gradient-x"></div>
                      {/* Bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-x"></div>
                      {/* Right border */}
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                    </div>
                    <div className="relative bg-card rounded-lg p-3 h-full z-0">
                      <h4 className="font-medium text-base">"Funlife" Student Comedy Club</h4>
                      <p className="text-primary text-xs font-medium mt-1">President (2017-2019)</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Kazakh-British Technical University, Almaty, Kazakhstan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Independent Performances Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Independent Performances</h3>

                {/* UAE Performances - WITH GRADIENT BORDER */}
                <div className="mb-4">
                  <div className="bg-card rounded-lg shadow-sm mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                      {/* Top border */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                      {/* Left border */}
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#00B5C9] to-[#EC51AB] animate-gradient-x"></div>
                      {/* Bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC51AB] via-[#00B5C9] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Right border */}
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                    </div>
                    <div className="relative bg-card rounded-lg p-3 z-0">
                      <h4 className="font-medium text-base mb-2">United Arab Emirates</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Comedy Kix</p>
                          <p className="text-xs text-muted-foreground">Dubai</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Flamingo Live Comedy</p>
                          <p className="text-xs text-muted-foreground">Dubai</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Mad Cat Comedy</p>
                          <p className="text-xs text-muted-foreground">Dubai</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Funeral Home Comedy</p>
                          <p className="text-xs text-muted-foreground">Abu Dhabi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kazakhstan Performances - WITH GRADIENT BORDER */}
                <div className="mb-8">
                  <div className="bg-card rounded-lg shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
                      {/* Top border */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Left border */}
                      <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#EC51AB] to-[#F6ED3C] animate-gradient-x"></div>
                      {/* Bottom border */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F6ED3C] via-[#EC51AB] to-[#00B5C9] animate-gradient-x"></div>
                      {/* Right border */}
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00B5C9] via-[#F6ED3C] to-[#EC51AB] animate-gradient-x"></div>
                    </div>
                    <div className="relative bg-card rounded-lg p-3 z-0">
                      <h4 className="font-medium text-base mb-2">Kazakhstan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Central Standup</p>
                          <p className="text-xs text-muted-foreground">Almaty</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Standup Astana</p>
                          <p className="text-xs text-muted-foreground">Astana</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Stand by Club</p>
                          <p className="text-xs text-muted-foreground">Almaty</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Otval Concert</p>
                          <p className="text-xs text-muted-foreground">Almaty</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Good Night Comedy</p>
                          <p className="text-xs text-muted-foreground">Almaty</p>
                        </div>
                        <div className="bg-muted/30 rounded-md p-2 text-center hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm">Sun Project</p>
                          <p className="text-xs text-muted-foreground">Astana</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* English Standup Section - ONLY VISIBLE ON LARGE SCREENS */}
            <section className="hidden lg:block">
              <h3 className="text-lg font-medium mb-3">English Standup</h3>
              <div className="h-[500px]">
                <Carousel showSingle={true}>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed1 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed2 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed3 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed4 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed5 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed6 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed7 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <EnglishInstagramEmbed8 />
                  </InstagramWrapper>
                </Carousel>
              </div>
            </section>

            {/* Russian Standup Section - ONLY VISIBLE ON LARGE SCREENS */}
            <section className="hidden lg:block">
              <h3 className="text-lg font-medium mb-3">Russian Standup</h3>
              <div className="h-[500px]">
                <Carousel showSingle={true}>
                  <InstagramWrapper>
                    <RussianInstagramEmbed1 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <RussianInstagramEmbed2 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <RussianInstagramEmbed3 />
                  </InstagramWrapper>
                  <InstagramWrapper>
                    <RussianInstagramEmbed4 />
                  </InstagramWrapper>
                </Carousel>
              </div>
            </section>
          </div>

          {/* Right Column - Featured Shows Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Shows</h2>
            {/* Use grid for responsive layout - single column on lg screens, 2 columns on smaller screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {/* Around the World Show */}
              <div
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer aspect-square"
                onClick={() =>
                  openImageModal(
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EBAZyAILi28oRtvx8Vmz4I9kRKfB3W.png",
                    "Around the World in 8 Comedians Show",
                  )
                }
              >
                <div className="relative pt-[60%] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EBAZyAILi28oRtvx8Vmz4I9kRKfB3W.png"
                    alt="Around the World in 8 Comedians Show"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="absolute inset-0 object-cover object-bottom bg-muted/10"
                    priority
                  />
                </div>
                <div className="p-3 flex flex-col justify-between" style={{ height: "40%" }}>
                  <h3 className="text-sm font-bold line-clamp-1">Around the World in 8 Comedians</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">October 27, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">BLABLA Bar, JBR, Dubai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Babushka Valentine's Show */}
              <div
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer aspect-square"
                onClick={() =>
                  openImageModal(
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Jzi0nvH79Fk1KkBJnMsBFheH8SWbP.png",
                    "Babushka Valentine's Day Show",
                  )
                }
              >
                <div className="relative pt-[60%] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Jzi0nvH79Fk1KkBJnMsBFheH8SWbP.png"
                    alt="Babushka Valentine's Day Show"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="absolute inset-0 object-cover bg-muted/10"
                    priority
                  />
                </div>
                <div className="p-3 flex flex-col justify-between" style={{ height: "40%" }}>
                  <h3 className="text-sm font-bold line-clamp-1">Valentine's Day Standup Show</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">February 13, 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">Babushka JBR, Dubai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stand by Club Show */}
              <div
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer aspect-square"
                onClick={() =>
                  openImageModal(
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DyVWyofPHSLlMRGNwis1offL7GlEtJ.png",
                    "Stand by Club Show",
                  )
                }
              >
                <div className="relative pt-[60%] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DyVWyofPHSLlMRGNwis1offL7GlEtJ.png"
                    alt="Stand by Club Show"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="absolute inset-0 object-cover bg-muted/10"
                    priority
                  />
                </div>
                <div className="p-3 flex flex-col justify-between" style={{ height: "40%" }}>
                  <h3 className="text-sm font-bold line-clamp-1">Проверка опытных комиков</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">July 20, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">Cenral Stand Up Club, Kabanbay batyr st. 71, Almaty</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comedy Kix Show */}
              <div
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer aspect-square"
                onClick={() =>
                  openImageModal(
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cGM3imulw4cYyPObacQgRykmRAlwHw.png",
                    "Comedy Kix Open Mic",
                  )
                }
              >
                <div className="relative pt-[60%] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cGM3imulw4cYyPObacQgRykmRAlwHw.png"
                    alt="Comedy Kix Open Mic"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="absolute inset-0 object-cover object-top bg-muted/10"
                    priority
                  />
                </div>
                <div className="p-3 flex flex-col justify-between" style={{ height: "40%" }}>
                  <h3 className="text-sm font-bold line-clamp-1">Russian Stand-up Comedy Open Mic</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">August 18, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">Ramee Dream Hotel, Business Bay, Dubai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* English Standup Carousel Section - ONLY VISIBLE ON SMALL SCREENS */}
        <section className="py-8 lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">English Standup</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <span>Swipe to see more</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          <div className="h-[500px]">
            <Carousel>
              <InstagramWrapper>
                <EnglishInstagramEmbed1 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed2 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed3 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed4 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed5 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed6 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed7 />
              </InstagramWrapper>
              <InstagramWrapper>
                <EnglishInstagramEmbed8 />
              </InstagramWrapper>
            </Carousel>
          </div>
        </section>

        {/* Russian Standup Carousel Section - ONLY VISIBLE ON SMALL SCREENS */}
        <section className="py-8 lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Russian Standup</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
              <span>Swipe to see more</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>

          <div className="h-[500px]">
            <Carousel>
              <InstagramWrapper>
                <RussianInstagramEmbed1 />
              </InstagramWrapper>
              <InstagramWrapper>
                <RussianInstagramEmbed2 />
              </InstagramWrapper>
              <InstagramWrapper>
                <RussianInstagramEmbed3 />
              </InstagramWrapper>
              <InstagramWrapper>
                <RussianInstagramEmbed4 />
              </InstagramWrapper>
            </Carousel>
          </div>
        </section>
        <ImageModal
          isOpen={modalOpen}
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  )
}

interface VenueCardProps {
  name: string
  location: string
  description: string
}

function VenueCard({ name, location, description }: VenueCardProps) {
  return (
    <div className="bg-muted/30 rounded-md p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  )
}

