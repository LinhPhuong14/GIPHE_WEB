"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useToast } from "@/components/ui/use-toast";

export function Pomodoro() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("timer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Timer state
  const [timerMode, setTimerMode] = useState("work"); // work, shortBreak, longBreak
  const [timeRemaining, setTimeRemaining] = useState(
    DEFAULT_SETTINGS.workDuration * 60
  ); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalCompletedToday, setTotalCompletedToday] = useState(0);

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userInfo = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={cn(
          "flex flex-col h-full flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-25"
        )}
      >
        <div className="flex-1">
          <DashboardHeader user={userInfo} />
          <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
            </div>

           
                   <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timer">Timer</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="timer" className="space-y-6">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {timerMode === "work"
                          ? "Focus Time"
                          : timerMode === "shortBreak"
                          ? "Focus Time"
                          : timerMode === "shortBreak"
                          ? "Short Break"
                          : "Long Break"}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab("settings")}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            settings.soundEnabled ? playSound() : null
                          }
                        >
                          {settings.soundEnabled ? (
                            <Volume2 className="h-4 w-4" />
                          ) : (
                            <VolumeX className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
