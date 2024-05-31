import { CarDetail } from '@/features/car/components/car-detail'
import prisma from '@/lib/utils/prisma'

const getCar = async (id: string) => {
  const car = prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  })

  return car
}

const CarPage = async ({ params }: { params: { id: string } }) => {
  const car = await getCar(params.id)

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <div>
      <CarDetail car={car} />
    </div>
  )
}

export default CarPage
