import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/dashboard/course-card";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Clock,
  MessageSquare,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

// Mock course data
const courses = [
  {
    id: "vocabulary-basics",
    title: "Vocabulary Basics",
    description: "Learn essential vocabulary for everyday conversations",
    progress: 65,
    lastLesson: "Food and Dining Vocabulary",
  },
  {
    id: "grammar-fundamentals",
    title: "Grammar Fundamentals",
    description: "Master the basic grammar rules and sentence structures",
    progress: 32,
    lastLesson: "Present Perfect Tense",
  },
  {
    id: "conversation-skills",
    title: "Conversation Skills",
    description: "Practice real-life conversations and improve fluency",
    progress: 78,
    lastLesson: "Making Appointments",
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Professional vocabulary and communication for the workplace",
    progress: 0,
  },
];

// Mock recent activities
const recentActivities = [
  {
    id: "1",
    type: "test",
    title: "Vocabulary Test",
    date: "Today, 10:30 AM",
    result: "85%",
  },
  {
    id: "2",
    type: "flashcard",
    title: "Travel Vocabulary",
    date: "Yesterday, 3:15 PM",
    cards: 20,
  },
  {
    id: "3",
    type: "conversation",
    title: "Restaurant Scenario",
    date: "Yesterday, 11:45 AM",
    duration: "15 min",
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* banner section */}
      <div className="hero-gradient dark:text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome back to GIPHE
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6 opacity-90">
            Continue your learning journey and track your progress across all
            subjects
          </p>
          <div className="flex space-x-4">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
            >
              <Link href="/ai-learning">Go to AI Learning</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent dark:border-white border text-neutral-900 dark:text-white hover:bg-white/10"
            >
              <Link href="/schedule">Your schedule</Link>
            </Button>
          </div>
        </div>
      </div>
      <BentoGrid className="mt-8">
        <BentoGridItem className="md:col-span-2 container mx-auto px-4 py-8">
          {/* Continue Learning Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Continue Testing</h2>
              <Link href="/dashboard/courses">
                <Button variant="ghost" className="flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses
                .filter((course) => course.progress > 0)
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </BentoGridItem>
          <BentoGridItem>
            {/* <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>
                  Frequently used learning tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/ai-conversation">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center justify-center"
                    >
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>AI Conversation</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/pomodoro">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center justify-center"
                    >
                      <Clock className="h-6 w-6 mb-2" />
                      <span>Pomodoro</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/notes">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center justify-center"
                    >
                      <BookOpen className="h-6 w-6 mb-2" />
                      <span>Notes</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/tests">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center justify-center"
                    >
                      <Brain className="h-6 w-6 mb-2" />
                      <span>Tests</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card> */}

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Study Streak</CardTitle>
                <CardDescription>Keep your learning momentum</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">7</div>
                  <p className="text-sm text-muted-foreground">days in a row</p>
                  <p className="mt-4 text-sm">
                    Great job! Keep learning daily to maintain your streak.
                  </p>
                </div>
              </CardContent>
            </Card>
          </BentoGridItem>
          {/* Explore New Courses */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Explore New Courses</h2>
              <Link href="/dashboard/courses">
                <Button variant="ghost" className="flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses
                .filter((course) => course.progress === 0)
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              <Card className="flex flex-col items-center justify-center h-full min-h-[250px] border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-secondary p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Discover More</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find more courses tailored to your learning goals
                  </p>
                  <Button variant="outline">Browse Catalog</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your learning activities from the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center p-3 border rounded-lg"
                      >
                        <div className="rounded-full bg-secondary p-2 mr-4">
                          {activity.type === "test" && (
                            <Brain className="h-5 w-5 text-primary" />
                          )}
                          {activity.type === "flashcard" && (
                            <BookOpen className="h-5 w-5 text-primary" />
                          )}
                          {activity.type === "conversation" && (
                            <MessageSquare className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                        <div className="text-right">
                          {activity.result && (
                            <span className="font-medium">
                              {activity.result}
                            </span>
                          )}
                          {activity.cards && (
                            <span>{activity.cards} cards</span>
                          )}
                          {activity.duration && (
                            <span>{activity.duration}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access */}
          </div>
        
      </BentoGrid>
    </div>
  );
}
