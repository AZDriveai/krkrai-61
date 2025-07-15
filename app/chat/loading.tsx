import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ChatLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <Card className="w-full max-w-md h-[500px] flex flex-col">
        <CardHeader className="border-b">
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-10 w-[75%] rounded-lg" />
            </div>
            <div className="flex items-start gap-3 justify-end">
              <Skeleton className="h-10 w-[75%] rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-10 w-[75%] rounded-lg" />
            </div>
            <div className="flex items-start gap-3 justify-end">
              <Skeleton className="h-10 w-[75%] rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex w-full gap-2">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  )
}
