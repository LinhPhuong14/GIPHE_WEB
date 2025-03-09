"use client";

import React, { useEffect, useState } from "react";
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
import { DockIcon, NavbarDock } from "../ui/dock";
import { useScroll, useSpring } from "framer-motion";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function LandingNavbar() {
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
    <div
      className={cn(
        "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/30 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
      style={{
        top: isDock ? 15 : 0,
        padding: isDock ? "0px 5px" : "5px 5px",
        borderRadius: isDock ? 100 : 0,
        width: isDock ? "max-content" : "100%",
        transition: "all 1s ease-in-out",
      }}
    >
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold px-2"
        >
          <span className="font-bold">GIPHE</span>
        </Link>
        <nav className="hidden gap-6 md:flex md:gap-10 px-2">
          <FloatingDock
            mobileClassName="mx-auto flex md:hidden h-16 gap-4 items-end  rounded-2xl bg-transparent px-4 pb-3"
            desktopClassName=""
            items={links}
          />
          {/* <NavbarDock direction="middle" className="z-50 w-full backdrop-blur-md dark:bg-black/10 bg-green-900/10">
        
          {links.map((i, index) => (
            <DockIcon key={index}>
              <h3>{i.title}</h3>
            </DockIcon>
          ))}
        
      </NavbarDock> */}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/login">
            <button className="px-4 py-2 rounded-full relative bg-transparent text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-800 to-transparent" />
              <span className="relative z-20">Sign Up</span>
            </button>
          </Link>
          <Link href="/login">
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
  );
}
