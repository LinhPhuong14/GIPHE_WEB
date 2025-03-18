"use client";
import { IconAlarm, IconClock, IconTimer } from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

function Pomodoro() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus"
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [settings, setSettings] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    volume: 50,
  });
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3");
    if (audioRef.current) {
      audioRef.current.volume = settings.volume / 100;
    }
  }, [settings.volume]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.volume = settings.volume / 100;
      audioRef.current.play();
    }
  };

  //Handle timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playAlarm();
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  //Change timer when mode changea
  useEffect(() => {
    switch (mode) {
      case "focus":
        setTimeLeft(settings.focus * 60);
        break;
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60);
        break;
      case "longBreak":
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  }, [mode, settings]);

  //Toggle time
  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeLeft(timeLeft);
    }
  };

  //Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings.focus * 60);
    setProgress(0);
  };

  //Update setting
    const updateSettings = (newSettings: typeof settings) => {
      setSettings(newSettings);
      setSettingsOpen(false);
      resetTimer();
    }

  //Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="container mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
        <p className="text-sm text-muted-foreground">welcome back</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pomodoro Timer</CardTitle>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Timer Settings</DialogTitle>
                  <DialogDescription>
                    Customize your timer durations and notification volume.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="focus" className="text-right">
                      Focus
                    </Label>
                    <Input
                      id="focus"
                      type="number"
                      value={settings.focus}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          focus: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      max="60"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="shortBreak" className="text-right">
                      Short Break
                    </Label>
                    <Input
                      id="shortBreak"
                      type="number"
                      value={settings.shortBreak}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shortBreak: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      max="30"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="longBreak" className="text-right">
                      Long Break
                    </Label>
                    <Input
                      id="longBreak"
                      type="number"
                      value={settings.longBreak}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          longBreak: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      max="60"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volume" className="text-right">
                      Volume
                    </Label>
                    <div className="col-span-3">
                      <Slider
                        id="volume"
                        value={[settings.volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) =>
                          setSettings({ ...settings, volume: value[0] })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => updateSettings(settings)}>
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Use the Pomodoro Technique to improve your focus and productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={mode}
            onValueChange={(value) =>
              setMode(value as "focus" | "shortBreak" | "longBreak")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="focus">Focus</TabsTrigger>
              <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
              <TabsTrigger value="longBreak">Long Break</TabsTrigger>
            </TabsList>
            <TabsContent value="focus" className="mt-6">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-bold mb-8">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex space-x-4">
                  <Button onClick={toggleTimer} size="lg">
                    {isActive ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shortBreak" className="mt-6">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-bold mb-8">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex space-x-4">
                  <Button onClick={toggleTimer} size="lg">
                    {isActive ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="longBreak" className="mt-6">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-bold mb-8">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex space-x-4">
                  <Button onClick={toggleTimer} size="lg">
                    {isActive ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Pomodoro;
