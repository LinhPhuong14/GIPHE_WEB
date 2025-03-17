import type React from "react"
import { MainNav } from "@/components/main-nav"
import { TopNavbar } from "@/components/dashboard/navbar"
import { SidebarProvider } from "@/components/sidebar-provider"
import { ChatbotAdvisor } from "@/components/dashboard/chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* <MainNav /> */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <ChatbotAdvisor />
        </div>
      </div>
    // </SidebarProvider>
  )
}

