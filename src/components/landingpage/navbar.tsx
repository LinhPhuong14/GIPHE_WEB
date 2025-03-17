"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconHome2,
  IconNewSection,
  IconTerminal2,
  IconTimeDuration0,
} from "@tabler/icons-react";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function NavBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDock, setIsDock] = useState(false);
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
    {
      title: "Contact",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsDock(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex items-center justify-center mx-auto w-full">
      <div
        className={cn(
          "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/30 backdrop-blur-md border-b"
            : "bg-transparent"
        )}
        style={{
          top: isDock ? 15 : 0,
          padding: isDock ? "0px 10px" : "5px 5px",
          borderRadius: isDock ? 100 : 0,
          width: isDock ? "max-content" : "100%",
          transition: "all 1s ease-in-out",
        }}
      >
        <div className="container flex h-16 items-center justify-between mx-auto">
          <Link
            href="/"
            className={cn("flex items-center space-x-2 font-semibold px-2",isDock?"hidden":"")}
          >
            <span className="font-bold">GIPHE</span>
          </Link>
          <FloatingDock
            mobileClassName=""
            desktopClassName="ml-2/3"
            items={links}
          />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link href="/auth/register">
              <button className="px-4 py-2 rounded-full relative bg-transparent text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-800 to-transparent" />
                <span className="relative z-20">Sign Up</span>
              </button>
            </Link>
            <Link href="/auth/login">
              <HoverBorderGradient
                containerClassName="rounded-full bg-zinc-900"
                as="button"
                className="px-4 py-2   text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200
              
              dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>Login</span>
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
