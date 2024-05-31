import { prisma } from '@/lib/utils'

export const getBrands = async () => {
  const brands = await prisma.brand.findMany()
  return brands
}

export const getModels = async () => {
  const models = await prisma.carModel.findMany()
  return models
}

export const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  })

  return cars
}
