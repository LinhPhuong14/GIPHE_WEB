"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";

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

          className="w-full h-full z-0"
          particleColor="#7928CA"
        />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Introduce to GIPHE
            </div>
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
              Unlock your potential with our comprehensive online learning
              platform. Access thousands of courses taught by industry experts.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-x-4"
          >
            <BackgroundGradient className="rounded-[18px] ">
              <Link href="/login">
                <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl ">
                  <span className="relative z-20">Get Started</span>
                </button>
              </Link>
            </BackgroundGradient>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
