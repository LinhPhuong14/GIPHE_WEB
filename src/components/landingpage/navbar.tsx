"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export function LandingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Feature",
      icon: (
        <IconTerminal2
          className={cn(
            "h-full w-full text-neutral-500 dark:text-neutral-300",
            pathname === "/#features" ? "text-foreground" : "text-foreground/60"
          )}
        />
      ),
      href: "/#features",
    },
    {
      title: "Test",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#testimonials",
    },

    {
      title: "Pricing",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#pricing",
    },
  ];
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <nav className="hidden md:flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 font-semibold">
            <span className="font-bold">GIPHE</span>
          </Link>
          <FloatingDock mobileClassName="translate-y-20" items={links} />
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
