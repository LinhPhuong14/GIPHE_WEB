import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has admin role
  if (!session || session.user?.role !== "admin") {
    redirect("/login")
  }

  // Redirect to the admin dashboard
  redirect("/admin/dashboard")
}

