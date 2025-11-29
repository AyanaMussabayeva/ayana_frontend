"use client"

import { useEffect, useRef } from "react"

interface LinkedInEmbedProps {
  postUrl: string
  height?: number
  width?: number
}

export function LinkedInEmbed({ postUrl, height = 570, width = 504 }: LinkedInEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // LinkedIn embed script
    const script = document.createElement("script")
    script.src = "https://platform.linkedin.com/badges/js/profile.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div ref={containerRef} className="linkedin-embed rounded-lg overflow-hidden border shadow-sm">
      <iframe
        src={postUrl}
        height={height}
        width={width}
        frameBorder="0"
        allowFullScreen={true}
        title="Embedded LinkedIn Post"
        className="w-full max-w-full"
      ></iframe>
    </div>
  )
}

