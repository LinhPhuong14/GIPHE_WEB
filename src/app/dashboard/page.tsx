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

function Skeleton() {
  return (
    <div className="h-40 w-full bg-neutral-200 animate-pulse rounded-md"></div>
  );
}

// Mock course data
const courses = [
  {
    id: "vocabulary-basics",
    title: "Vocabulary Basics",
    description: "Learn essential vocabulary for everyday conversations",
    progress: 65,
    header: <Skeleton />,
  },
  {
    id: "grammar-fundamentals",
    title: "Grammar Fundamentals",
    description: "Master the basic grammar rules and sentence structures",
    progress: 32,
    header: <Skeleton />,
  },
  {
    id: "conversation-skills",
    title: "Conversation Skills",
    description: "Practice real-life conversations and improve fluency",
    progress: 78,
    header: <Skeleton />,
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Professional vocabulary and communication for the workplace",
    progress: 0,
    header: <Skeleton />,
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
        <div className="container mx-auto px-4 py-12">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome back to GIPHE
          </h3>
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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 mb-10 container mx-auto px-4 py-8">
          {/* Continue Learning Section */}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Continue Testing</h2>
            <Link href="/dashboard/courses">
              <Button variant="ghost" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <BentoGrid className="gap-4">
            {courses.map((course, i) => (
              <BentoGridItem
                key={i}
                title={course.title}
                description={course.description}
                header={course.header}
                progress={course.progress}
              />
            ))}
          </BentoGrid>
        </div>
        <div className="md:col-span-1 ">
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

          {/* Recent Activity */}

          <Card className="mt-6">
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
                        <span className="font-medium">{activity.result}</span>
                      )}
                      {activity.cards && <span>{activity.cards} cards</span>}
                      {activity.duration && <span>{activity.duration}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
