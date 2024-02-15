import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonBody() {
  return (
    <div className="container flex flex-col gap-4 min-h-screen min-w-screen">
      <Skeleton className="w-full py-6 rounded-full" />

      <Skeleton className="w-[400px] py-4 rounded-full" />

      <div>
        <Skeleton className="w-full h-1/2" />

        <div className="space-y-6">
          <Skeleton className="w-[400px] py-4 rounded-full" />
          <Skeleton className="w-full h-[500px]" />
        </div>
      </div>
    </div>
  )
}