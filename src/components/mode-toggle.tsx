"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" className="
    dark:bg-transparent dark:hover:bg-white/30 dark:active:bg-transparent rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}> 
      {theme === "dark" ? (
        <Sun className="h-[3rem] w-[3rem]" />
      ) : (
        <Moon className="h-[3rem] w-[3rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}