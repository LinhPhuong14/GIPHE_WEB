"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

const mockHistory = [
  { date: "2023-04-15", completedPomodoros: 8, totalWorkTime: 200 },
  { date: "2023-04-14", completedPomodoros: 6, totalWorkTime: 150 },
  { date: "2023-04-13", completedPomodoros: 10, totalWorkTime: 250 },
  { date: "2023-04-12", completedPomodoros: 4, totalWorkTime: 100 },
  { date: "2023-04-11", completedPomodoros: 7, totalWorkTime: 175 },
  { date: "2023-04-10", completedPomodoros: 5, totalWorkTime: 125 },
  { date: "2023-04-09", completedPomodoros: 9, totalWorkTime: 225 },
];

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
};

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
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [tempSettings, setTempSettings] = useState(DEFAULT_SETTINGS);

  // History state
  const [history, setHistory] = useState(mockHistory);

  // Refs
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);

    if (!isRunning) {
      toast({
        title:
          timerMode === "work" ? "Focus time started" : "Break time started",
        description: "Stay focused and productive!",
      });
    }
  };

  const handleReset = () => {
    setIsRunning(false);

    if (timerMode === "work") {
      setTimeRemaining(settings.workDuration * 60);
    } else if (timerMode === "shortBreak") {
      setTimeRemaining(settings.shortBreakDuration * 60);
    } else {
      setTimeRemaining(settings.longBreakDuration * 60);
    }

    toast({
      title: "Timer reset",
      description: "The timer has been reset.",
    });
  };

  const handleSkip = () => {
    setIsRunning(false);

    if (timerMode === "work") {
      // Skip to break without counting as completed
      if (
        completedSessions % settings.sessionsBeforeLongBreak ===
        settings.sessionsBeforeLongBreak - 1
      ) {
        setTimerMode("longBreak");
        setTimeRemaining(settings.longBreakDuration * 60);
      } else {
        setTimerMode("shortBreak");
        setTimeRemaining(settings.shortBreakDuration * 60);
      }
    } else {
      // Skip break, back to work
      setTimerMode("work");
      setTimeRemaining(settings.workDuration * 60);
    }

    toast({
      title: "Timer skipped",
      description: `Skipped to ${
        timerMode === "work" ? "break" : "work"
      } time.`,
    });
  };
  const handleSaveSettings = () => {
    setSettings(tempSettings);
    localStorage.setItem("pomodoroSettings", JSON.stringify(tempSettings));

    // Update current timer based on new settings
    if (timerMode === "work") {
      setTimeRemaining(tempSettings.workDuration * 60);
    } else if (timerMode === "shortBreak") {
      setTimeRemaining(tempSettings.shortBreakDuration * 60);
    } else {
      setTimeRemaining(tempSettings.longBreakDuration * 60);
    }

    setActiveTab("timer");

    toast({
      title: "Settings saved",
      description: "Your pomodoro settings have been updated.",
    });
  };
  const handleChangeTimerMode = (mode) => {
    setIsRunning(false)
    setTimerMode(mode)

    if (mode === "work") {
      setTimeRemaining(settings.workDuration * 60)
    } else if (mode === "shortBreak") {
      setTimeRemaining(settings.shortBreakDuration * 60)
    } else {
      setTimeRemaining(settings.longBreakDuration * 60)
    }
  }

  const handleResetSettings = () => {
    setTempSettings(DEFAULT_SETTINGS);

    toast({
      title: "Settings reset",
      description: "Settings have been reset to default values.",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
   const getTimerProgress = () => {
    let totalSeconds
    if (timerMode === "work") {
      totalSeconds = settings.workDuration * 60
    } else if (timerMode === "shortBreak") {
      totalSeconds = settings.shortBreakDuration * 60
    } else {
      totalSeconds = settings.longBreakDuration * 60
    }

    return ((totalSeconds - timeRemaining) / totalSeconds) * 100
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
                      <span className="font-bold">
                        {totalCompletedToday * settings.workDuration} min
                      </span>
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
                <audio ref={audioRef} src="/sounds/bell.mp3" />
              </TabsContent>
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Timer Settings</CardTitle>
                    <CardDescription>Customize your pomodoro timer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="work-duration">Focus Duration</Label>
                          <span className="text-sm text-muted-foreground">{tempSettings.workDuration} minutes</span>
                        </div>
                        <Slider
                          id="work-duration"
                          min={5}
                          max={60}
                          step={5}
                          value={[tempSettings.workDuration]}
                          onValueChange={(value) => setTempSettings({ ...tempSettings, workDuration: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="short-break-duration">Short Break Duration</Label>
                          <span className="text-sm text-muted-foreground">
                            {tempSettings.shortBreakDuration} minutes
                          </span>
                        </div>
                        <Slider
                          id="short-break-duration"
                          min={1}
                          max={15}
                          step={1}
                          value={[tempSettings.shortBreakDuration]}
                          onValueChange={(value) => setTempSettings({ ...tempSettings, shortBreakDuration: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="long-break-duration">Long Break Duration</Label>
                          <span className="text-sm text-muted-foreground">
                            {tempSettings.longBreakDuration} minutes
                          </span>
                        </div>
                        <Slider
                          id="long-break-duration"
                          min={5}
                          max={30}
                          step={5}
                          value={[tempSettings.longBreakDuration]}
                          onValueChange={(value) => setTempSettings({ ...tempSettings, longBreakDuration: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="sessions-before-long-break">Sessions Before Long Break</Label>
                          <span className="text-sm text-muted-foreground">
                            {tempSettings.sessionsBeforeLongBreak} sessions
                          </span>
                        </div>
                        <Slider
                          id="sessions-before-long-break"
                          min={2}
                          max={8}
                          step={1}
                          value={[tempSettings.sessionsBeforeLongBreak]}
                          onValueChange={(value) =>
                            setTempSettings({ ...tempSettings, sessionsBeforeLongBreak: value[0] })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-start-breaks">Auto-start Breaks</Label>
                        <Switch
                          id="auto-start-breaks"
                          checked={tempSettings.autoStartBreaks}
                          onCheckedChange={(checked) => setTempSettings({ ...tempSettings, autoStartBreaks: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-start-pomodoros">Auto-start Pomodoros</Label>
                        <Switch
                          id="auto-start-pomodoros"
                          checked={tempSettings.autoStartPomodoros}
                          onCheckedChange={(checked) =>
                            setTempSettings({ ...tempSettings, autoStartPomodoros: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-enabled">Sound Notifications</Label>
                        <Switch
                          id="sound-enabled"
                          checked={tempSettings.soundEnabled}
                          onCheckedChange={(checked) => setTempSettings({ ...tempSettings, soundEnabled: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications-enabled">Desktop Notifications</Label>
                        <Switch
                          id="notifications-enabled"
                          checked={tempSettings.notificationsEnabled}
                          onCheckedChange={(checked) => {
                            if (checked && "Notification" in window && Notification.permission !== "granted") {
                              Notification.requestPermission()
                            }
                            setTempSettings({ ...tempSettings, notificationsEnabled: checked })
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Default
                    </Button>
                    <Button onClick={handleSaveSettings}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pomodoro Statistics</CardTitle>
                    <CardDescription>Track your productivity over time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Last 7 Days</h3>
                      <div className="h-[200px] flex items-end justify-between">
                        {history.slice(0, 7).map((day, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div
                              className="bg-primary rounded-t-md w-12"
                              style={{
                                height: `${(day.completedPomodoros / 10) * 150}px`,
                                transition: "height 0.3s ease",
                              }}
                            ></div>
                            <span className="text-sm">
                              {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                            </span>
                            <span className="text-xs text-muted-foreground">{day.completedPomodoros}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Pomodoros</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {history.reduce((total, day) => total + day.completedPomodoros, 0)}
                          </div>
                          <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Focus Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {history.reduce((total, day) => total + day.totalWorkTime, 0)} min
                          </div>
                          <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {Math.round(
                              history.reduce((total, day) => total + day.completedPomodoros, 0) / history.length,
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">Pomodoros per day</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Recent Activity</h3>
                      <div className="space-y-2">
                        {history.slice(0, 5).map((day, i) => (
                          <div key={i} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(day.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{day.completedPomodoros} pomodoros</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span>{day.totalWorkTime} min</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
