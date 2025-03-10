// "use client";
// import React, { useState } from "react";
// import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
// import {
//   BookOpen,
//   GraduationCap,
//   Calendar,
//   MessageSquare,
//   Mic,
//   FileText,
//   User,
//   ClipboardList,
//   StickyNote,
//   Clock,
//   BookMarked,
//   Users,
//   LayoutDashboard,
//   School,
//   Timer,
//   Trophy,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { toast, useToast } from "@/components/ui/use-toast";
// import Link from "next/link";
// import { motion } from "motion/react";
// import Image from "next/image";

// import { cn } from "@/lib/utils";
// import { CourseGrid } from "@/components/dashboard/course-grid";
// import { Switch } from "@/components/ui/switch";

// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";

// export default function DashboardPage() {
//   //   const session = await getServerSession(authOptions)

//   //   if (!session) {
//   //     redirect("/login")
//   //   }
// const [isTutorMode, setIsTutorMode] = useState(false);
//   // Mock user role - in a real app, this would come from your auth context
//   const userRole = "student"; // Options: "student", "tutor", "admin"

//   // Common routes for all users
//   const commonRoutes = [
//     {
//       title: "Dashboard",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       title: "My Courses",
//       href: "/dashboard/courses",
//       icon: BookOpen,
//     },
//     {
//       title: "Learning Paths",
//       href: "/dashboard/paths",
//       icon: GraduationCap,
//     },
//     {
//       title: "Tests Gallery",
//       href: "/dashboard/tests",
//       icon: ClipboardList,
//     },
//     {
//       title: "Notes Gallery",
//       href: "/dashboard/notes",
//       icon: StickyNote,
//     },
//     {
//       title: "Speaking Practice",
//       href: "/dashboard/speaking",
//       icon: Mic,
//     },
//     {
//       title: "Vocabulary",
//       href: "/dashboard/vocabulary",
//       icon: BookMarked,
//     },
//     {
//       title: "Pomodoro Timer",
//       href: "/dashboard/pomodoro",
//       icon: Timer,
//     },
//     {
//       title: "Schedule",
//       href: "/dashboard/schedule",
//       icon: Calendar,
//     },
//     {
//       title: "Learning Reports",
//       href: "/dashboard/reports",
//       icon: FileText,
//     },
//     {
//       title: "Messages",
//       href: "/dashboard/messages",
//       icon: MessageSquare,
//     },
//     {
//       title: "Profile",
//       href: "/dashboard/profile",
//       icon: User,
//     },
//   ];

//   // Tutor-specific routes
//   const tutorRoutes = [
//     {
//       title: "My Students",
//       href: "/dashboard/tutor/students",
//       icon: Users,
//     },
//     {
//       title: "Create Tests",
//       href: "/dashboard/tutor/tests",
//       icon: ClipboardList,
//     },
//     {
//       title: "Assignments",
//       href: "/dashboard/tutor/assignments",
//       icon: FileText,
//     },
//   ];

// // const pathname = usePathname();
//   const { toast } = useToast();
//   // Determine which routes to show based on user role and mode
//   let routes = [...commonRoutes];

//   if ((userRole === "student" && isTutorMode)) {
//     routes = [...commonRoutes, ...tutorRoutes];
//   }
//   const stats = {
//     totalCourses: 8,
//     coursesCompleted: 5,
//     hoursSpent: 42,
//     averageScore: 85,
//     learningStreak: 7,
//     certificatesEarned: 3,
//   };

//   const toggleTutorMode = () => {
//     setIsTutorMode(!isTutorMode);
//     toast({
//       title: isTutorMode ? "Student Mode Activated" : "Tutor Mode Activated",
//       description: isTutorMode
//         ? "You are now browsing as a student"
//         : "You now have access to tutor features",
//     });
//   };

//   const [open, setOpen] = useState(false);
//   return (
//     <div
//       className={cn(
//         "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         "h-[60vh]"
//       )}
//     /
// </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, GraduationCap, School, Trophy } from "lucide-react";
import { CourseGrid } from "@/components/dashboard/course-grid";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function StudentDashboard() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex flex-col w-full transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}>
        <div className="flex flex-1">
          <DashboardHeader user={{ name: "John Doe", image: "" }} />
        </div>

        <div className="flex flex-1">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const stats = {
    totalCourses: 8,
    coursesCompleted: 5,
    hoursSpent: 42,
    averageScore: 85,
    learningStreak: 7,
    certificatesEarned: 3,
  };
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="container mx-auto bottom-[50px] my-6 space-y-5">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses Progress */}
          <Card className="dark:bg-black shadow-md border rounded-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="dark:text-white text-sm font-semibold text-gray-700">
                Courses Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white font-bold text-gray-900">
                {stats.coursesCompleted}/{stats.totalCourses}
              </div>
              <p className="text-xs text-gray-500">Courses completed</p>
              <Progress
                value={(stats.coursesCompleted / stats.totalCourses) * 100}
                className="h-2 mt-3"
              />
            </CardContent>
          </Card>

          {/* Learning Time */}
          <Card className="dark:bg-black shadow-md border rounded-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="dark:text-white text-sm font-semibold text-gray-700">
                Learning Time
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white font-bold text-gray-900">
                {stats.hoursSpent} hrs
              </div>
              <p className="text-xs dark:text-white text-gray-500">Total learning time</p>
              <div className="mt-3 text-xs text-gray-500">
                <span className="text-green-500 font-medium">↑ 12%</span> from
                last month
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="dark:bg-neutral-800 shadow-md border rounded-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="dark:text-white text-sm font-semibold text-gray-700">
                Achievements
              </CardTitle>
              <Trophy className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl dark:text-white font-bold text-gray-900">
                {stats.certificatesEarned}
              </div>
              <p className="text-xs dark:text-white text-gray-500">Certificates earned</p>
              <div className="mt-3 text-xs text-gray-500">
                <span className="text-primary font-medium">
                  {stats.learningStreak} day
                </span>{" "}
                learning streak
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl dark:text-white font-bold text-gray-800 mb-4">
            Recommended For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced React Patterns",
                description: "Master advanced React techniques and patterns",
                duration: "15 hours",
                level: "Intermediate",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Data Visualization with D3.js",
                description:
                  "Create interactive data visualizations for the web",
                duration: "12 hours",
                level: "Intermediate",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Machine Learning Fundamentals",
                description:
                  "Learn the basics of machine learning algorithms and applications",
                duration: "20 hours",
                level: "Beginner",
                image: "/placeholder.svg?height=200&width=400",
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-md border rounded-lg bg-white transition-transform hover:shadow-xl hover:scale-105"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span>{course.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="shadow-md p-4">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Your learning activity over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-end justify-between">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => {
                  const height = Math.floor(Math.random() * 100) + 20;
                  return (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div
                        className="bg-primary rounded-t-md w-10 transition-all duration-300"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-sm">{day}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(height / 20)}h
                      </span>
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* My Courses */}
      <CourseGrid />
    </div>
  );
};
