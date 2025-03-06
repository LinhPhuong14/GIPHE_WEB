"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript.",
    image: "",
    progress: 75,
    category: "Development",
    duration: "8 hours",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Master the core concepts of data science and analytics.",
    image: "",
    progress: 45,
    category: "Data Science",
    duration: "12 hours",
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Create beautiful and functional user interfaces.",
    image: "",
    progress: 20,
    category: "Design",
    duration: "10 hours",
  },
  {
    id: 4,
    title: "Advanced React Development",
    description: "Take your React skills to the next level.",
    image: "",
    progress: 0,
    category: "Development",
    duration: "15 hours",
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and applications.",
    image: "",
    progress: 10,
    category: "Data Science",
    duration: "20 hours",
  },
  {
    id: 6,
    title: "Digital Marketing Strategies",
    description: "Learn effective digital marketing techniques for business growth.",
    image: "/placeholder.svg?height=200&width=400",
    progress: 0,
    category: "Marketing",
    duration: "8 hours",
  },
]

export function CourseGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={course.image || ""}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>
                <CardTitle className="mt-2">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant={course.progress > 0 ? "default" : "secondary"}>
                  <Play className="mr-2 h-4 w-4" />
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

