"use client"

import * as React from "react"
import { ToastProvider, useToast as useShadToast } from "@/components/ui/toast"

export function useToast() {
  return useShadToast()
}

export function ToastWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
