import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Users } from "lucide-react"
import { userInfo } from "os"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated and has admin role
  if (!session || session.user?.role !== "admin") {
    redirect("/login")
  }
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: Users,
      change: "+12%",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Active Tests",
      value: "32",
      icon: BookOpen,
      change: "+4%",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Active Tutors",
      value: "18",
      icon: GraduationCap,
      change: "+2",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Active Subscriptions",
      value: "842",
      icon: CreditCard,
      change: "+7%",
      color: "bg-orange-500/10 text-orange-500",
    },
  ]

  const userInfo = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  }
  return (
    <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader user={userInfo} />
          <main className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`${stat.color} p-2 rounded-full`}>
                      {<stat.icon className="h-4 w-4" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">User {i}</div>
                            <div className="text-sm text-muted-foreground">user{i}@example.com</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{i} day{i !== 1 ? 's' : ''} ago</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Subscription Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">User {i}</div>
                            <div className="text-sm text-muted-foreground">Premium Plan - $19.99</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{i * 2} hour{i * 2 !== 1 ? 's' : ''} ago</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
  )
}
