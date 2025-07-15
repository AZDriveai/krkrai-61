import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <div className="flex items-start justify-end gap-4">
            <div className="space-y-2 text-right">
              <Skeleton className="h-4 w-[220px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  )
}
