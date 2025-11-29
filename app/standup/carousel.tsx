"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Update the Carousel component to accept a showSingle prop and adjust the layout accordingly

// First, update the interface to include the new prop
interface CarouselProps {
  children: React.ReactNode
  showSingle?: boolean
}

// Then update the component definition to use the new prop
export function Carousel({ children, showSingle = false }: CarouselProps) {
  // Convert children to array to ensure we can work with it consistently
  const childrenArray = React.Children.toArray(children)
  const totalSlides = childrenArray.length

  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Navigation functions
  const nextSlide = () => {
    const newSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
    scrollToSlide(newSlide)
  }

  const prevSlide = () => {
    const newSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
    scrollToSlide(newSlide)
  }

  // Update the scrollToSlide function to handle vertical videos
  const scrollToSlide = (slideIndex: number) => {
    if (carouselRef.current) {
      // Calculate slide width based on the container width and our desired peek amount
      const containerWidth = carouselRef.current.offsetWidth
      const slideWidth = showSingle ? containerWidth : containerWidth * 0.75 // Each slide takes full width if showSingle is true

      // For vertical videos, we want to center them
      const scrollPosition = slideIndex * slideWidth

      // Add an offset to center the slide in the container
      const offset = showSingle ? 0 : (containerWidth - slideWidth) / 2

      carouselRef.current.scrollTo({
        left: scrollPosition - offset,
        behavior: "smooth",
      })
    }
  }

  // Process Instagram embeds when slide changes
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()

      // Add multiple processing attempts with delays
      const delays = [500, 1000, 2000, 3000]
      delays.forEach((delay) => {
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process()

            // Force hide captions
            document.querySelectorAll(".instagram-media p").forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.display = "none"
              }
            })

            // Force black background
            document.querySelectorAll(".instagram-media div").forEach((el) => {
              if (el instanceof HTMLElement && !el.querySelector("a")) {
                el.style.backgroundColor = "#000"
              }
            })
          }
        }, delay)
      })
    }
  }, [currentSlide])

  // Mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      // Calculate slide width based on the container width and our desired peek amount
      const containerWidth = carouselRef.current.offsetWidth
      const slideWidth = showSingle ? containerWidth : containerWidth * 0.75

      // Find the closest slide based on scroll position
      const newSlide = Math.round(carouselRef.current.scrollLeft / slideWidth)
      setCurrentSlide(Math.max(0, Math.min(newSlide, totalSlides - 1)))

      // Snap to the closest slide
      scrollToSlide(Math.max(0, Math.min(newSlide, totalSlides - 1)))
    }
  }

  // Handle scroll events to update current slide
  const handleScroll = () => {
    if (carouselRef.current && !isDragging) {
      // Calculate slide width based on the container width and our desired peek amount
      const containerWidth = carouselRef.current.offsetWidth
      const slideWidth = showSingle ? containerWidth : containerWidth * 0.75

      // Find the closest slide based on scroll position
      const newSlide = Math.round(carouselRef.current.scrollLeft / slideWidth)

      if (newSlide !== currentSlide) {
        setCurrentSlide(Math.max(0, Math.min(newSlide, totalSlides - 1)))
      }
    }
  }

  // If no children or only one child, render it directly
  if (!totalSlides) {
    return null
  }

  // If showSingle is true, only render the current slide
  if (showSingle) {
    return (
      <div className="relative">
        {/* Carousel track */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Navigation buttons (overlaid) */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-90 hover:opacity-100 shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-90 hover:opacity-100 shadow-md"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Single slide display */}
          <div className="flex justify-center items-center">
            <div className="overflow-hidden rounded-lg border shadow-lg">{childrenArray[currentSlide]}</div>
          </div>
        </div>

        {/* Slide indicators and counter */}
        {totalSlides > 1 && (
          <div className="flex justify-between items-center mt-2">
            {/* Slide counter */}
            <div className="text-xs font-medium text-muted-foreground">
              {currentSlide + 1} / {totalSlides}
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-1.5 transition-all duration-300",
                    currentSlide === index ? "w-4 bg-primary rounded-full" : "w-1.5 bg-muted rounded-full",
                  )}
                  onClick={() => {
                    setCurrentSlide(index)
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Empty div for flex alignment */}
            <div className="w-12"></div>
          </div>
        )}
      </div>
    )
  }

  // Regular carousel for multiple slides
  return (
    <div className="relative">
      {/* Carousel track */}
      <div className="relative overflow-hidden rounded-lg" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        {/* Gradient overlays to indicate more content */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Navigation buttons (overlaid) */}
        {totalSlides > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-90 hover:opacity-100 shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-90 hover:opacity-100 shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Scrollable container */}
        <div
          ref={carouselRef}
          className={cn(
            "flex snap-x snap-mandatory overflow-x-auto scrollbar-hide pb-4",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="min-w-[300px] w-[300px] flex-shrink-0 snap-center px-2 py-4" // Adjusted width
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className={cn(
                  "overflow-hidden rounded-lg border transition-all duration-300",
                  currentSlide === index ? "scale-100 opacity-100 shadow-lg" : "scale-95 opacity-80",
                )}
              >
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators and counter */}
      {totalSlides > 1 && (
        <div className="flex justify-between items-center mt-2">
          {/* Slide counter */}
          <div className="text-xs font-medium text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  currentSlide === index ? "w-4 bg-primary rounded-full" : "w-1.5 bg-muted rounded-full",
                )}
                onClick={() => {
                  setCurrentSlide(index)
                  scrollToSlide(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Empty div for flex alignment */}
          <div className="w-12"></div>
        </div>
      )}
    </div>
  )
}

