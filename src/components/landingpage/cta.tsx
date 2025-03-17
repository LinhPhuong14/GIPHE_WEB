"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BackgroundGradient } from "@/components/ui/background-gradient"

export function LandingCta() {
  return (
    <section id="pricing" className="py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted dark:bg-opacity-50 z-10">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to start your learning journey?</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of students already learning on our platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <BackgroundGradient className="rounded-[22px] ">
              <Link href="/login">
                <Button size="lg" className="h-12 px-8 rounded-[20px]">
                  Get Started for Free
                </Button>
              </Link>
            </BackgroundGradient>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}

