"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BookOpen, GraduationCap, BarChart, Calendar, MessageSquare, Settings, HelpCircle, Mic, FileText, User, ClipboardList, StickyNote, Clock, BookMarked, Users, LayoutDashboard, School, Timer, BrainCircuit, Sparkles } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isTutorMode, setIsTutorMode] = useState(false)

  // Mock user role - in a real app, this would come from your auth context
  const userRole = "student" // Options: "student", "tutor", "admin"

  const toggleTutorMode = () => {
    setIsTutorMode(!isTutorMode)
    toast({
      title: isTutorMode ? "Student Mode Activated" : "Tutor Mode Activated",
      description: isTutorMode 
        ? "You are now browsing as a student" 
        : "You now have access to tutor features",
    })
  }

  // Common routes for all users
  const commonRoutes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Learning Paths",
      href: "/dashboard/paths",
      icon: GraduationCap,
    },
    {
      title: "Tests Gallery",
      href: "/dashboard/tests",
      icon: ClipboardList,
    },
    {
      title: "Notes Gallery",
      href: "/dashboard/notes",
      icon: StickyNote,
    },
    {
      title: "Speaking Practice",
      href: "/dashboard/speaking",
      icon: Mic,
    },
    {
      title: "Vocabulary",
      href: "/dashboard/vocabulary",
      icon: BookMarked,
    },
    {
      title: "Pomodoro Timer",
      href: "/dashboard/pomodoro",
      icon: Timer,
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      title: "Learning Reports",
      href: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ]

  // Tutor-specific routes
  const tutorRoutes = [
    {
      title: "My Students",
      href: "/dashboard/tutor/students",
      icon: Users,
    },
    {
      title: "Create Tests",
      href: "/dashboard/tutor/tests",
      icon: ClipboardList,
    },
    {
      title: "Assignments",
      href: "/dashboard/tutor/assignments",
      icon: FileText,
    },
  ]

  // Admin-specific routes
  const adminRoutes = [
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Content Management",
      href: "/dashboard/admin/content",
      icon: FileText,
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart,
    },
  ]

  // Determine which routes to show based on user role and mode
  let routes = [...commonRoutes]
  
  if (userRole === "tutor" || (userRole === "admin" && isTutorMode)) {
    routes = [...commonRoutes, ...tutorRoutes]
  }
  
  if (userRole === "admin") {
    routes = isTutorMode 
      ? [...commonRoutes, ...tutorRoutes] 
      : [...commonRoutes, ...adminRoutes]
  }

  return (
    <Side>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>EduLearn</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {(userRole === "tutor" || userRole === "admin") && (
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tutor Mode</span>
              </div>
              <Switch 
                checked={isTutorMode} 
                onCheckedChange={toggleTutorMode} 
              />
            </div>
            <SidebarSeparator />
          </SidebarGroup>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Learning Tools</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="AI Assistant">
                <Link href="/dashboard/ai-assistant">
                  <Sparkles className="h-5 w-5" />
                  <span>AI Assistant</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Brain Training">
                <Link href="/dashboard/brain-training">
                  <BrainCircuit className="h-5 w-5" />
                  <span>Brain Training</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/help">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
