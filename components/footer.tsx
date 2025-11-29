import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import i18n from "@/lib/i18n"

const common = i18n.getResourceBundle("en", "common")

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {common.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="mailto:ayana.mussabayeva@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={common.footer.email}
            >
              <Mail className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/AyanaMussabayeva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={common.footer.github}
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/ayana-mussabayeva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={common.footer.linkedin}
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

