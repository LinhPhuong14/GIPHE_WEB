"use client";

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
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
import {
  Play,
  Pause,
  SkipForward,
  Settings,
  Volume2,
  VolumeX,
  RotateCw,
  Clock,
  Calendar,
  BarChart,
  CheckCircle,
} from "lucide-react"


const mockHistory = [
  { date: "2023-04-15", completedPomodoros: 8, totalWorkTime: 200 },
  { date: "2023-04-14", completedPomodoros: 6, totalWorkTime: 150 },
  { date: "2023-04-13", completedPomodoros: 10, totalWorkTime: 250 },
  { date: "2023-04-12", completedPomodoros: 4, totalWorkTime: 100 },
  { date: "2023-04-11", completedPomodoros: 7, totalWorkTime: 175 },
  { date: "2023-04-10", completedPomodoros: 5, totalWorkTime: 125 },
  { date: "2023-04-09", completedPomodoros: 9, totalWorkTime: 225 },
]

// Default Pomodoro settings
const DEFAULT_SETTINGS = {
  workDuration: 25, // minutes
  shortBreakDuration: 5, // minutes
  longBreakDuration: 15, // minutes
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: true,
  autoStartPomodoros: false,
  soundEnabled: true,
  notificationsEnabled: true,
}

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

  // Settings state
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [tempSettings, setTempSettings] = useState(DEFAULT_SETTINGS)

  // History state
  const [history, setHistory] = useState(mockHistory)

  // Refs
  const timerRef = useRef(null)
  const audioRef = useRef(null)

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning])


  const handleStartPause = () => {
    setIsRunning(!isRunning)

    if (!isRunning) {
      toast({
        title: timerMode === "work" ? "Focus time started" : "Break time started",
        description: "Stay focused and productive!",
      })
    }
  }

  const handleReset = () => {
    setIsRunning(false)

    if (timerMode === "work") {
      setTimeRemaining(settings.workDuration * 60)
    } else if (timerMode === "shortBreak") {
      setTimeRemaining(settings.shortBreakDuration * 60)
    } else {
      setTimeRemaining(settings.longBreakDuration * 60)
    }

    toast({
      title: "Timer reset",
      description: "The timer has been reset.",
    })
  }

  const handleSkip = () => {
    setIsRunning(false)

    if (timerMode === "work") {
      // Skip to break without counting as completed
      if (completedSessions % settings.sessionsBeforeLongBreak === settings.sessionsBeforeLongBreak - 1) {
        setTimerMode("longBreak")
        setTimeRemaining(settings.longBreakDuration * 60)
      } else {
        setTimerMode("shortBreak")
        setTimeRemaining(settings.shortBreakDuration * 60)
      }
    } else {
      // Skip break, back to work
      setTimerMode("work")
      setTimeRemaining(settings.workDuration * 60)
    }

    toast({
      title: "Timer skipped",
      description: `Skipped to ${timerMode === "work" ? "break" : "work"} time.`,
    })
  }
const handleSaveSettings = () => {
    setSettings(tempSettings)
    localStorage.setItem("pomodoroSettings", JSON.stringify(tempSettings))

    // Update current timer based on new settings
    if (timerMode === "work") {
      setTimeRemaining(tempSettings.workDuration * 60)
    } else if (timerMode === "shortBreak") {
      setTimeRemaining(tempSettings.shortBreakDuration * 60)
    } else {
      setTimeRemaining(tempSettings.longBreakDuration * 60)
    }

    setActiveTab("timer")

    toast({
      title: "Settings saved",
      description: "Your pomodoro settings have been updated.",
    })
  }

  const handleResetSettings = () => {
    setTempSettings(DEFAULT_SETTINGS)

    toast({
      title: "Settings reset",
      description: "Settings have been reset to default values.",
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }


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
                  <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Today's Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Completed Pomodoros</span>
                      </div>
                      <span className="font-bold">{totalCompletedToday}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span>Total Focus Time</span>
                      </div>
                      <span className="font-bold">{totalCompletedToday * settings.workDuration} min</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-purple-500" />
                        <span>Current Session</span>
                      </div>
                      <span className="font-bold">{completedSessions + 1}</span>
                    </div>
                  </CardContent>
                </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
