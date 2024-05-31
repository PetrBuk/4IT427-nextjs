import { Car, CarModel, Brand } from '@prisma/client'

export interface CarWithDeps extends Car {
  model: CarModel
  brand: Brand
}
