"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Award, BookOpen, BarChart3, TrendingUp, Mic } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for learning reports
const learningData = {
  overview: {
    totalHours: 42,
    coursesCompleted: 5,
    coursesInProgress: 3,
    averageScore: 85,
    learningStreak: 7,
    lastActive: "Today",
  },
  skills: {
    listening: 75,
    speaking: 60,
    reading: 85,
    writing: 70,
    grammar: 80,
    vocabulary: 65,
  },
  courses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      progress: 100,
      score: 92,
      completedDate: "2023-12-15",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 45,
      score: 88,
      lastActive: "2 days ago",
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      progress: 20,
      score: 75,
      lastActive: "1 week ago",
    },
    {
      id: 4,
      title: "Advanced React Development",
      progress: 100,
      score: 95,
      completedDate: "2023-11-20",
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      progress: 10,
      score: null,
      lastActive: "3 days ago",
    },
  ],
  weeklyActivity: [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2.0 },
    { day: "Wed", hours: 0.5 },
    { day: "Thu", hours: 1.0 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 3.0 },
    { day: "Sun", hours: 1.0 },
  ],
}

export default function LearningReportsPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="container py-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Learning Reports</h1>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="col-span-1"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Learning Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningData.overview.totalHours} hrs</div>
                  <p className="text-xs text-muted-foreground">+2.5 hrs from last week</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="col-span-1"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningData.overview.coursesCompleted}</div>
                  <p className="text-xs text-muted-foreground">
                    {learningData.overview.coursesInProgress} courses in progress
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="col-span-1"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningData.overview.averageScore}%</div>
                  <p className="text-xs text-muted-foreground">+5% from previous courses</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="col-span-1"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningData.overview.learningStreak} days</div>
                  <p className="text-xs text-muted-foreground">Last active: {learningData.overview.lastActive}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Activity</CardTitle>
              <CardDescription>Hours spent learning per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between">
                {learningData.weeklyActivity.map((day, i) => (
                  <div key={day.day} className="flex flex-col items-center gap-2">
                    <div
                      className="bg-primary rounded-t-md w-12"
                      style={{
                        height: `${(day.hours / 3) * 150}px`,
                        transition: "height 0.3s ease",
                      }}
                    ></div>
                    <span className="text-sm">{day.day}</span>
                    <span className="text-xs text-muted-foreground">{day.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Your proficiency in different learning areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(learningData.skills).map(([skill, value], index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="capitalize">{skill}</div>
                    <div className="text-sm font-medium">{value}%</div>
                  </div>
                  <Progress value={value} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Improvement Recommendations</CardTitle>
              <CardDescription>Suggested courses to improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Improve Speaking Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      Practice with our AI-powered speaking exercises to improve fluency and pronunciation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Enhance Vocabulary</h4>
                    <p className="text-sm text-muted-foreground">
                      Take our vocabulary builder course to expand your word knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningData.courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.progress === 100 && <Badge className="bg-green-500">Completed</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span>{course.score ? `${course.score}%` : "Not graded"}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {course.completedDate
                        ? `Completed on: ${new Date(course.completedDate).toLocaleDateString()}`
                        : `Last active: ${course.lastActive}`}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your learning patterns and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">Most Active Times</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center">
                        <div className="text-sm font-medium">{day}</div>
                        <div className="mt-2 grid grid-rows-6 gap-1">
                          {Array.from({ length: 6 }).map((_, i) => {
                            const opacity = Math.random() > 0.5 ? Math.random() * 0.8 + 0.2 : 0.1
                            return <div key={i} className="h-4 rounded-sm bg-primary" style={{ opacity }}></div>
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Morning</span>
                    <span>Afternoon</span>
                    <span>Evening</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Learning Consistency</h3>
                  <div className="flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="text-lg font-medium">Improving</div>
                      <p className="text-sm text-muted-foreground">
                        Your learning consistency has improved by 15% compared to last month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

