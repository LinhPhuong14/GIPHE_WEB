"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  BookOpen,
  Award,
  Bell,
  Shield,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import React from "react";
import { links } from "@/data/link";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status, router]);

  const [profile, setProfile] = useState({
    name: session?.user?.name || "John Doe",
    email: session?.user?.email || "john@example.com",
    bio: "Passionate learner with interests in web development, data science, and artificial intelligence. Always looking to expand my knowledge and skills.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    occupation: "Software Developer",
    joinDate: "January 2023",
    interests: [
      "Web Development",
      "Data Science",
      "Machine Learning",
      "UX/UI Design",
    ],
    languages: [
      "English (Native)",
      "Spanish (Intermediate)",
      "French (Beginner)",
    ],
    certificates: [
      {
        name: "Web Development Fundamentals",
        date: "March 2023",
        issuer: "EduLearn",
      },
      {
        name: "Data Science Essentials",
        date: "June 2023",
        issuer: "EduLearn",
      },
    ],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      darkMode: true,
      language: "English",
      timezone: "Pacific Time (PT)",
    },
  });
  const userInfo = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };

  const [open, setOpen] = useState(false);
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handlePreferenceChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1">
        <DashboardHeader user={userInfo} />
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={
                          session?.user?.image ||
                          ""
                        }
                        alt={profile.name}
                      />
                      <AvatarFallback>
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined {profile.joinDate}</span>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Languages</h3>
                    <div className="space-y-1">
                      {profile.languages.map((language) => (
                        <div key={language} className="text-sm">
                          {language}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.certificates.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                value={profile.email}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={profile.location}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    location: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input
                              id="occupation"
                              value={profile.occupation}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  occupation: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={profile.bio}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  bio: e.target.value,
                                })
                              }
                              rows={4}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm">{profile.bio}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">
                                  Full Name
                                </div>
                                <div className="text-sm ml-auto">
                                  {profile.name}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">Email</div>
                                <div className="text-sm ml-auto">
                                  {profile.email}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">Phone</div>
                                <div className="text-sm ml-auto">
                                  {profile.phone}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">
                                  Location
                                </div>
                                <div className="text-sm ml-auto">
                                  {profile.location}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">
                                  Occupation
                                </div>
                                <div className="text-sm ml-auto">
                                  {profile.occupation}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div className="text-sm font-medium">
                                  Member Since
                                </div>
                                <div className="text-sm ml-auto">
                                  {profile.joinDate}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    {isEditing && (
                      <CardFooter className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Learning Journey</CardTitle>
                      <CardDescription>
                        Your educational background and achievements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-medium">Education</h3>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <div className="font-medium">
                                  Bachelor of Science in Computer Science
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  University of Technology • 2018 - 2022
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="font-medium">Learning Goals</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                Complete Advanced React Course
                              </div>
                              <Badge variant="outline">In Progress</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                Master Machine Learning Fundamentals
                              </div>
                              <Badge variant="outline">Planned</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                Improve Spanish Language Skills
                              </div>
                              <Badge variant="outline">In Progress</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="account" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account details and security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Update Password</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Accounts</CardTitle>
                      <CardDescription>
                        Manage accounts connected to your profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#4285F4] text-white p-1 rounded">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Google</div>
                            <div className="text-sm text-muted-foreground">
                              Connected
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#333] text-white p-1 rounded">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.31 24 12C24 5.37 18.63 0 12 0Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">GitHub</div>
                            <div className="text-sm text-muted-foreground">
                              Connected
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              Email Notifications
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={profile.preferences.emailNotifications}
                          onCheckedChange={(checked) =>
                            handlePreferenceChange(
                              "emailNotifications",
                              checked
                            )
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Receive notifications via SMS
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={profile.preferences.smsNotifications}
                          onCheckedChange={(checked) =>
                            handlePreferenceChange("smsNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Weekly Digest</div>
                            <div className="text-sm text-muted-foreground">
                              Receive a weekly summary of your learning progress
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={profile.preferences.weeklyDigest}
                          onCheckedChange={(checked) =>
                            handlePreferenceChange("weeklyDigest", checked)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Application Settings</CardTitle>
                      <CardDescription>
                        Customize your application experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select
                            value={profile.preferences.language}
                            onValueChange={(value) =>
                              handlePreferenceChange("language", value)
                            }
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                              <SelectItem value="Chinese">Chinese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select
                            value={profile.preferences.timezone}
                            onValueChange={(value) =>
                              handlePreferenceChange("timezone", value)
                            }
                          >
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pacific Time (PT)">
                                Pacific Time (PT)
                              </SelectItem>
                              <SelectItem value="Mountain Time (MT)">
                                Mountain Time (MT)
                              </SelectItem>
                              <SelectItem value="Central Time (CT)">
                                Central Time (CT)
                              </SelectItem>
                              <SelectItem value="Eastern Time (ET)">
                                Eastern Time (ET)
                              </SelectItem>
                              <SelectItem value="Greenwich Mean Time (GMT)">
                                Greenwich Mean Time (GMT)
                              </SelectItem>
                              <SelectItem value="Central European Time (CET)">
                                Central European Time (CET)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Dark Mode</div>
                            <div className="text-sm text-muted-foreground">
                              Toggle between light and dark mode
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={profile.preferences.darkMode}
                          onCheckedChange={(checked) =>
                            handlePreferenceChange("darkMode", checked)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


