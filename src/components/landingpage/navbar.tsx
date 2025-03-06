"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen } from "lucide-react"

export function LandingNavbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">GIPHE</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/#features" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Features
            </Link>
            <Link
              href="/#testimonials"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/#testimonials" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Testimonials
            </Link>
            <Link
              href="/#pricing"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/#pricing" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

