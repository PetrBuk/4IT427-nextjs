import { Badge } from '@/lib/components/ui/badge'
import { TableCell, TableRow } from '@/lib/components/ui/table'
import { CarWithDeps } from '@/lib/types/prisma-types'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <TableRow>
      <TableCell>{car.brand.name}</TableCell>
      <TableCell>{car.model.name}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          {car.location || 'N/A'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{car.year}</TableCell>
      <TableCell>{car.price || 'N/A'}</TableCell>
      <TableCell>
        <Link href={`/car/${car.id}`}>
          <Search />
        </Link>
      </TableCell>
    </TableRow>
  )
}
