'use client'

import { Button } from '@/lib/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error Boundary: ', error)
  }, [error])

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-1 items-center justify-center rounded-lg border shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Unexpected Error!
          </h3>
          <p className="text-sm text-muted-foreground">
            Oups, something went wrong. Please, try to go back or refresh the
            page.
          </p>
          <div className="flex flex-row gap-4">
            <Button variant="outline" className="mt-4" onClick={() => reset()}>
              Refresh
            </Button>
            <Link href={'/'}>
              <Button className="mt-4">Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
