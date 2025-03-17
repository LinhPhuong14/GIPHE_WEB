import Link from "next/link"
import { BookOpen } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t py-6 md:py-0 z-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EduLearn. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/cookies" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  )
}

