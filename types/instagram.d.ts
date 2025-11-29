// Add TypeScript interface for the window object to include instgrm
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

