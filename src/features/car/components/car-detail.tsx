import { Button } from '@/lib/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card'
import { Separator } from '@/lib/components/ui/separator'
import { CarWithDeps } from '@/lib/types/prisma-types'
import { Copy } from 'lucide-react'

type CarDetailProps = {
  car: CarWithDeps
}

export const CarDetail = ({ car }: CarDetailProps) => {
  const tax = car.price || NaN * 0.21
  const shipping = 5000
  const total = car.price || NaN + shipping + tax

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Car {car.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Car ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Added: {car.createdAt.toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Car Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Year</span>
              <span>{car.year}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Description</span>
              <span>{car.description}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <span>
                {(car.price || NaN).toLocaleString('cs-CZ', {
                  style: 'currency',
                  currency: 'CZK',
                })}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {Number(5000).toLocaleString('cs-CZ', {
                  style: 'currency',
                  currency: 'CZK',
                })}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>
                {tax.toLocaleString('cs-CZ', {
                  style: 'currency',
                  currency: 'CZK',
                })}
              </span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>
                {total.toLocaleString('cs-CZ', {
                  style: 'currency',
                  currency: 'CZK',
                })}
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Brand Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>{car.brand.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Created At</dt>
              <dd>{car.brand.createdAt.toLocaleDateString()}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">ID</dt>
              <dd>{car.brand.id}</dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Model Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>{car.model.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Created At</dt>
              <dd>{car.model.createdAt.toLocaleDateString()}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">ID</dt>
              <dd>{car.model.id}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated: {car.updatedAt.toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  )
}
