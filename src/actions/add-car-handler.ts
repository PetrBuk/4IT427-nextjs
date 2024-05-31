'use server'

import { createCarSchema } from '@/features/car/model/schema'
import { CarWithDeps } from '@/lib/types/prisma-types'
import prisma from '@/lib/utils/prisma'

type InitState = {
  result: ''
  fields: Record<string, never>
}

type SuccesState = {
  result: 'success'
  car: CarWithDeps
  fields: Record<string, never>
}

type ErrorState = {
  result: 'error'
  message?: string
  fields?: Record<string, string>
  errors?: { path: (string | number)[]; message: string }[]
}

export type AddCarFormState = SuccesState | ErrorState | InitState

export const addCarFormHandler = async (
  _prevState: AddCarFormState,
  data: FormData
): Promise<AddCarFormState> => {
  const formData = Object.fromEntries(data)
  const parsed = createCarSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }

    return {
      result: 'error',
      message: 'Invalid form data',
      fields,
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    }
  }

  const car = await prisma.car.create({
    data: {
      brandId: parsed.data.brand,
      modelId: parsed.data.model,
      location: parsed.data.location,
      year: parsed.data.year,
      description: parsed.data.description,
    },
    include: {
      brand: true,
      model: true,
    },
  })

  return { result: 'success', fields: {}, car }
}
