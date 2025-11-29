"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface ImageModalProps {
  isOpen: boolean
  imageUrl: string
  altText: string
  onClose: () => void
}

export function ImageModal({ isOpen, imageUrl, altText, onClose }: ImageModalProps) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button
          className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close image"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={altText}
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}

