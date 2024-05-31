import { CarItem } from './car-item'
import { CarWithDeps } from '@/lib/types/prisma-types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CarFilterForm } from './car-filter-forms'
import { Brand, CarModel } from '@prisma/client'

type CarListProps = {
  brands: Brand[]
  models: CarModel[]
  cars: CarWithDeps[]
}

export const CarList = ({ brands, models, cars }: CarListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:justify-between">
        <div className="grid gap-2">
          <CardTitle>Cars list</CardTitle>
          <CardDescription>List of all cars in the database</CardDescription>
        </div>
        <CarFilterForm brands={brands} models={models} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="hidden sm:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Show</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
