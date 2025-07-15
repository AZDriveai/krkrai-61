"use client"

import type React from "react"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends React.ComponentProps<typeof Image> {
  alt: string
}

export function OptimizedImage({ alt, className, ...props }: OptimizedImageProps) {
  return <Image alt={alt} className={cn("object-cover", className)} {...props} />
}
