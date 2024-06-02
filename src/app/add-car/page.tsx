import AddCarFormContainer from '@/features/car/components/add-car-form-container'
import { Skeleton } from '@/lib/components/ui/skeleton'
import { Suspense } from 'react'

export default async function AddCar() {
  return (
    <div className="grid gap-4 md:gap-8">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
        }
      >
        <AddCarFormContainer />
      </Suspense>
    </div>
  )
}
