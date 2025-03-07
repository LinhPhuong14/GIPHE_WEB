import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Sidebar } from "@/components/ui/sidebar"
import { CourseGrid } from "@/components/dashboard/course-grid"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <DashboardHeader user={session.user} />
          <main className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Your Learning Dashboard</h1>
            <CourseGrid />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

