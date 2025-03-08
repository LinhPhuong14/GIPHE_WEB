"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Developer",
    content:
      "EduLearn has been instrumental in advancing my career. The courses are well-structured and the instructors are top-notch.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
  },
  {
    name: "Sarah Williams",
    role: "Marketing Manager",
    content:
      "I've taken several marketing courses on EduLearn and they've all been excellent. The platform is intuitive and the content is up-to-date.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "The data science courses on EduLearn are comprehensive and practical. I've applied what I've learned directly to my work.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    content:
      "As a designer, I appreciate the quality of the design courses. The instructors are experienced professionals who provide valuable insights.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
  },
]

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What our students say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dont just take our word for it. Hear from some of our amazing students.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

