"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Award, Users, MessageSquare, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: BookOpen,
    title: "Extensive Course Library",
    description: "Access thousands of courses across various subjects and disciplines.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Clock,
    title: "Learn at Your Own Pace",
    description: "Study whenever and wherever you want with flexible scheduling.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Receive recognized certificates upon completion of courses.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals and academic experts.",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: MessageSquare,
    title: "Interactive Learning",
    description: "Engage with instructors and peers through forums and live sessions.",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: BarChart,
    title: "Track Your Progress",
    description: "Monitor your learning journey with detailed analytics and insights.",
    color: "bg-teal-500/10 text-teal-500",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted dark:bg-opacity-50 z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools and resources you need to enhance your learning experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 z-50">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", feature.color)}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

