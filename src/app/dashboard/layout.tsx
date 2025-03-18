"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { MainNav } from "@/components/main-nav";
import { TopNavbar } from "@/components/dashboard/navbar";
import { SidebarProvider } from "@/components/sidebar-provider";
import { ChatbotAdvisor } from "@/components/dashboard/chatbot";
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="flex h-screen overflow-hidden">
          {/* <MainNav /> */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopNavbar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden md:pr-2">{children}</main>
            <ChatbotAdvisor />
          </div>
        </div>
      </div>
    </div>
  );
}
