"use client"

import { useEffect, useRef, useState } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export function YouTubeEmbed({ videoId, title = "YouTube video", className = "" }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url: string): string => {
    // If it's already just an ID, return it
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url
    }

    // Handle youtu.be URLs
    const shortUrlRegex = /youtu\.be\/([a-zA-Z0-9_-]{11})/
    const match1 = url.match(shortUrlRegex)
    if (match1) return match1[1]

    // Handle youtube.com URLs with v parameter
    const longUrlRegex = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
    const match2 = url.match(longUrlRegex)
    if (match2) return match2[1]

    // Handle youtube.com URLs with embed
    const embedUrlRegex = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    const match3 = url.match(embedUrlRegex)
    if (match3) return match3[1]

    // Handle URLs with additional parameters
    const paramUrlRegex = /youtube\.com\/watch.*?\?.*?v=([a-zA-Z0-9_-]{11})/
    const match4 = url.match(paramUrlRegex)
    if (match4) return match4[1]

    return videoId // Return the original if no pattern matches
  }

  const actualVideoId = getYouTubeVideoId(videoId)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true)
    }

    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", handleLoad)
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", handleLoad)
      }
    }
  }, [])

  return (
    <div className={`relative rounded-lg overflow-hidden aspect-video ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full rounded-lg"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${actualVideoId}?si=S_u16WWt37xq-gu1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

