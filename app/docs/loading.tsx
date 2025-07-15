import { Skeleton } from "@/components/ui/skeleton"

export default function DocsLoading() {
  return (
    <div className="flex h-full">
      <div className="w-64 border-r p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      <div className="flex-1 p-6">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[80%] mb-6" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[70%] mb-2" />
      </div>
    </div>
  )
}
