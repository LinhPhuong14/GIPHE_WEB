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
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
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
import { Switch } from "@/components/ui/switch";
import { ModeToggle } from "@/components/mode-toggle";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function StudentDashboard() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-col items-center justify-between px-4 py-2 w-full">
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
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

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
    //     <div className="flex flex-1 flex-col gap-8 p-6 bg-gray-100">
    //   {/* Dashboard Stats */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     {/* Courses Progress */}
    //     <Card className="shadow-md border rounded-lg bg-white p-5">
    //       <CardHeader className="flex flex-row items-center justify-between pb-2">
    //         <CardTitle className="text-sm font-semibold text-gray-700">Courses Progress</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-gray-900">
    //           {stats.coursesCompleted}/{stats.totalCourses}
    //         </div>
    //         <p className="text-xs text-gray-500">Courses completed</p>
    //         <Progress value={(stats.coursesCompleted / stats.totalCourses) * 100} className="h-2 mt-3" />
    //       </CardContent>
    //     </Card>

    //     {/* Learning Time */}
    //     <Card className="shadow-md border rounded-lg bg-white p-5">
    //       <CardHeader className="flex flex-row items-center justify-between pb-2">
    //         <CardTitle className="text-sm font-semibold text-gray-700">Learning Time</CardTitle>
    //         <Clock className="h-4 w-4 text-gray-500" />
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-gray-900">{stats.hoursSpent} hrs</div>
    //         <p className="text-xs text-gray-500">Total learning time</p>
    //         <div className="mt-3 text-xs text-gray-500">
    //           <span className="text-green-500 font-medium">↑ 12%</span> from last month
    //         </div>
    //       </CardContent>
    //     </Card>

    //     {/* Achievements */}
    //     <Card className="shadow-md border rounded-lg bg-white p-5">
    //       <CardHeader className="flex flex-row items-center justify-between pb-2">
    //         <CardTitle className="text-sm font-semibold text-gray-700">Achievements</CardTitle>
    //         <Trophy className="h-4 w-4 text-gray-500" />
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-gray-900">{stats.certificatesEarned}</div>
    //         <p className="text-xs text-gray-500">Certificates earned</p>
    //         <div className="mt-3 text-xs text-gray-500">
    //           <span className="text-primary font-medium">{stats.learningStreak} day</span> learning streak
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Recommended Courses */}
    //   <div>
    //     <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended For You</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {[
    //         {
    //           title: "Advanced React Patterns",
    //           description: "Master advanced React techniques and patterns",
    //           duration: "15 hours",
    //           level: "Intermediate",
    //           image: "",
    //         },
    //         {
    //           title: "Data Visualization with D3.js",
    //           description: "Create interactive data visualizations for the web",
    //           duration: "12 hours",
    //           level: "Intermediate",
    //           image: "",
    //         },
    //         {
    //           title: "Machine Learning Fundamentals",
    //           description: "Learn the basics of machine learning algorithms and applications",
    //           duration: "20 hours",
    //           level: "Beginner",
    //           image: "",
    //         },
    //       ].map((course, index) => (
    //         <Card key={index} className="overflow-hidden shadow-md border rounded-lg bg-white transition-transform hover:shadow-xl hover:scale-105">
    //           <div className="aspect-video w-full overflow-hidden">
    //             <Image src={course.image} alt={course.title} className="object-cover w-full h-full transition-transform hover:scale-105" />
    //           </div>
    //           <CardHeader className="p-4">
    //             <CardTitle className="text-lg font-semibold text-gray-800">{course.title}</CardTitle>
    //             <CardDescription className="text-sm text-gray-600">{course.description}</CardDescription>
    //           </CardHeader>
    //           <CardContent className="p-4 pt-0 flex items-center justify-between text-sm text-gray-600">
    //             <div className="flex items-center gap-1">
    //               <Clock className="h-4 w-4 text-gray-500" />
    //               <span>{course.duration}</span>
    //             </div>
    //             <div className="flex items-center gap-1">
    //               <GraduationCap className="h-4 w-4 text-gray-500" />
    //               <span>{course.level}</span>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Recent Activity */}
    //   <div>
    //     <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
    //     <Card className="shadow-md border rounded-lg bg-white p-5">
    //       <CardHeader>
    //         <CardTitle className="text-lg font-semibold text-gray-800">Learning Progress</CardTitle>
    //         <CardDescription className="text-sm text-gray-600">Your learning activity over the past week</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="h-[200px] flex items-end justify-between gap-2">
    //           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
    //             const height = Math.floor(Math.random() * 100) + 20;
    //             return (
    //               <div key={day} className="flex flex-col items-center gap-2">
    //                 <div className="bg-blue-500 rounded-t-md w-10" style={{ height: `${height}px`, transition: "height 0.3s ease" }}></div>
    //                 <span className="text-sm text-gray-700">{day}</span>
    //                 <span className="text-xs text-gray-500">{Math.floor(height / 20)}h</span>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* My Courses */}
    //   <CourseGrid />
    // </div>
    <div className="flex flex-col space-y-6 p-6">
      {/* Thống kê tiến độ học tập */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-lg p-4">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Courses Progress
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.coursesCompleted}/{stats.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">Courses completed</p>
            <Progress
              value={(stats.coursesCompleted / stats.totalCourses) * 100}
              className="h-2 mt-3"
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg p-4">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Learning Time
            </CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursSpent} hrs</div>
            <p className="text-xs text-muted-foreground">Total learning time</p>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑ 12%</span> from
              last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg p-4">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Achievements
            </CardTitle>
            <Trophy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
            <div className="mt-3 text-xs text-muted-foreground">
              <span className="text-primary font-medium">
                {stats.learningStreak} day
              </span>{" "}
              learning streak
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Khóa học đề xuất */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendedCourses.map((course, index) => (
        <Card key={index} className="shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="aspect-video w-full overflow-hidden bg-gray-200">
            <Image
              src={course.image || "/placeholder.jpg"}
              alt={course.title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{course.level}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div> */}
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
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
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
            })}
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <CourseGrid />
    </div>
  );
};
