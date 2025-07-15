import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-[100px]" />
          </CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-3 w-[200px] mt-1" />
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-[100px]" />
          </CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-3 w-[200px] mt-1" />
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-[100px]" />
          </CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <p className="text-xs text-muted-foreground">
            <Skeleton className="h-3 w-[200px] mt-1" />
          </p>
        </CardContent>
      </Card>
      <div className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-[200px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
