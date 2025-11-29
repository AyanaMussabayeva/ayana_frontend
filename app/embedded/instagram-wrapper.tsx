"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface InstagramWrapperProps {
  children: React.ReactNode
}

export function InstagramWrapper({ children }: InstagramWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Function to hide captions and standardize size
    const processPosts = () => {
      if (wrapperRef.current) {
        // Find all Instagram embeds
        const embeds = wrapperRef.current.querySelectorAll(".instagram-media")

        // Standardize size for all embeds
        embeds.forEach((embed) => {
          if (embed instanceof HTMLElement) {
            // Set fixed dimensions for vertical orientation
            embed.style.maxWidth = "100%"
            embed.style.width = "100%"
            embed.style.minWidth = "100%"
            embed.style.margin = "0"
            embed.style.backgroundColor = "#000" // Add black background
            embed.style.height = "100%" // Ensure full height

            // Find and hide all caption elements with comprehensive selectors
            const captionSelectors = [
              ".Caption",
              "._4EzTm",
              ".sqdOP.yWX7d._8A5w5",
              ".xLCgt",
              ".KlCQn",
              "._7UhW9",
              "[data-testid='post-comment-root']",
              ".C4VMK",
              "p[style*='color: #c9c8cd']",
              "div[style*='color: #3897f0']",
              "div[style*='padding: 12.5% 0']",
              "div[style*='padding: 19% 0']",
              "div[style*='margin-bottom: 14px']",
              "div[style*='margin-bottom: 24px']",
              "div[style*='flex-direction: column']",
              "div[style*='flex-grow: 1']",
              "div[style*='justify-content: center']",
              "a[style*='text-decoration: none'] > div",
              "div[style*='display: flex'] + div",
              // Add selectors for comment sections
              "section",
              "textarea",
              "form",
              ".X7cDz",
              "._1XyCr",
              "._15y0l",
              // Add any other selectors that might be for comments
            ]

            // Hide all matching elements
            captionSelectors.forEach((selector) => {
              const elements = embed.querySelectorAll(selector)
              elements.forEach((el) => {
                if (el instanceof HTMLElement) {
                  el.style.display = "none"
                }
              })
            })

            // Also hide all paragraphs (which often contain captions)
            const paragraphs = embed.querySelectorAll("p")
            paragraphs.forEach((p) => {
              if (p instanceof HTMLElement) {
                p.style.display = "none"
              }
            })

            // Add black background to the video container
            const videoContainers = embed.querySelectorAll("div:not(:first-child)")
            videoContainers.forEach((container) => {
              if (container instanceof HTMLElement) {
                container.style.backgroundColor = "#000"
              }
            })

            // Force iframe to take up more space
            const iframes = embed.querySelectorAll("iframe")
            iframes.forEach((iframe) => {
              if (iframe instanceof HTMLElement) {
                iframe.style.height = "100%"
                iframe.style.width = "100%"
                iframe.style.maxWidth = "360px"
                iframe.style.backgroundColor = "#000"
              }
            })
          }
        })
      }
    }

    // Process embeds when Instagram script loads
    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
        // Try multiple times to process posts as they might load at different times
        setTimeout(processPosts, 500)
        setTimeout(processPosts, 1000)
        setTimeout(processPosts, 2000)
      }
    }

    // Initial processing
    processEmbeds()

    // Set up a mutation observer to watch for changes
    const observer = new MutationObserver(() => {
      processPosts()
    })

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="instagram-embed-wrapper"
      style={{
        overflow: "hidden",
        borderRadius: "8px",
        height: "500px", // Increased height from 400px to 500px
        width: "300px",
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor: "#000",
      }}
    >
      {children}
    </div>
  )
}

