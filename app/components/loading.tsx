import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="col-span-full pt-10">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-44 h-8" />
        <div className="grid grid-cols-2 gap-6 mt-1.5">
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
        </div>
      </div>
    </div>
  )
}
