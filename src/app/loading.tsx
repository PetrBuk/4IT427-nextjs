import { Skeleton } from '@/lib/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-sm" />
      <div className="space-y-2">
        <Skeleton className="h-[80%] w-full" />
      </div>
    </div>
  )
}
