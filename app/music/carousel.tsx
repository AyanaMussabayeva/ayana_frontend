"use client"

import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
}

export function Carousel({ children }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const length = React.Children.count(children)

  const next = () => {
    setCurrent((current + 1) % length)
  }

  const prev = () => {
    setCurrent((current - 1 + length) % length)
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div className="flex justify-center items-center min-h-[600px]">{children[current]}</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm"
          onClick={prev}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm"
          onClick={next}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length }).map((_, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className={`h-2 w-2 rounded-full ${i === current ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrent(i)}
            >
              <span className="sr-only">Go to slide {i + 1}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

