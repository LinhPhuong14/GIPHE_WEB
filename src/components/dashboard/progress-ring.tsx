"use client"

import { useEffect, useRef } from "react"

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}

export function ProgressRing({ progress, size = 80, strokeWidth = 6, color = "stroke-primary" }: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = offset.toString()
    }
  }, [offset, progress])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle className="stroke-muted fill-none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
      <circle
        ref={circleRef}
        className={`${color} fill-none progress-ring-circle`}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
      />
    </svg>
  )
}

