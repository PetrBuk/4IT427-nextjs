import { CarList } from '@/features/car/components/car-list'
import { getBrands, getCars, getModels } from '@/api/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: {
    location: string
    brand: string
    model: string
  }
}) {
  const carsQuery = getCars()
  const brandsQuery = getBrands()
  const modelsQuery = getModels()

  const [cars, brands, models] = await Promise.all([
    carsQuery,
    brandsQuery,
    modelsQuery,
  ])

  const filteredCars = cars.filter((car) => {
    const location = searchParams.location
    const brand = searchParams.brand
    const model = searchParams.model

    return (
      (location ? car.location?.includes(searchParams.location) : true) &&
      (brand ? car.brand.id.includes(searchParams.brand) : true) &&
      (model ? car.model.id.includes(searchParams.model) : true)
    )
  })

  return (
    <div className="grid">
      <CarList brands={brands} models={models} cars={filteredCars} />
    </div>
  )
}
