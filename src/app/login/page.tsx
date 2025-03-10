"use client";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ModeToggle } from "@/components/mode-toggle";

// export const metadata: Metadata = {
//   title: "Login - GIPHE",
//   description: "Login to your EduLearn account",
// }

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   if (status === "authenticated" && session) {
  //     // Redirect based on user role
  //     if (session.user?.role === "admin") {
  //       router.push("/admin")
  //     } else {
  //       router.push("/dashboard")
  //     }
  //   } else if (status !== "loading") {
  //     setIsLoading(false)
  //   }
  // }, [session, status, router])

  // if (isLoading) {
  //   return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  // }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        
        <div className="justify-between relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-zinc-900  text-center font-sans font-bold">
          <Link href="/" className="flex items-center">
            GIPHE
          </Link>
        </div>
        <BackgroundBeams />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Login to GIPHE if you can because we don&apos;t have a login
              flow yet
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
