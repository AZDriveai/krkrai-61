"use client"

import Image, { type ComponentProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends ComponentProps<typeof Image> {
  // You can add custom props here if needed
}

export function OptimizedImage({
  // Changed to named export
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-200 text-gray-400", className)}
        style={{ width, height }}
      >
        <span className="text-sm">فشل تحميل الصورة</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...{ src, alt, width, height, fill, sizes, quality, priority }}
        className={cn("transition-all duration-300", isLoading ? "scale-105 blur-sm" : "scale-100 blur-0")}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAPwCdABmX/9k="
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        quality={quality || 80}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
