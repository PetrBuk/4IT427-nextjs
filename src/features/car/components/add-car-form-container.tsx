import { getBrands, getModels } from '@/api/queries'
import { AddCarForm } from '@/features/car/components/add-car-form'

export default async function AddCarFormContainer() {
  const brandsQuery = getBrands()
  const modelsQuery = getModels()

  const [brands, models] = await Promise.all([brandsQuery, modelsQuery])

  return (
    <div className="grid gap-4 md:gap-8">
      <AddCarForm brands={brands} models={models} />
    </div>
  )
}
