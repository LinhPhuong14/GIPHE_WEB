"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { SparklesCore } from "@/components/ui/sparkles"

export function LandingHero() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#7928CA"
        />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Introducing EduLearn</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Learn Anything, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Unlock your potential with our comprehensive online learning platform. Access thousands of courses taught
              by industry experts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-x-4"
          >
            <BackgroundGradient className="rounded-[22px] p-0.5 bg-gradient-to-r from-purple-500 to-pink-500">
              <Link href="/login">
                <Button size="lg" className="h-12 px-8 rounded-[20px]">
                  Get Started
                </Button>
              </Link>
            </BackgroundGradient>
            <Link href="/#features">
              <Button variant="outline" size="lg" className="h-12 px-8">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

