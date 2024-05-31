import { z } from 'zod'

export const createCarSchema = z.object({
  brand: z.string().min(3, {
    message: 'Car brand is required',
  }),
  model: z.string().min(3, {
    message: 'Car model is required',
  }),
  location: z.string(),
  price: z.coerce.number().int().min(1, {
    message: 'Price must be greater than 0',
  }),
  year: z.coerce
    .number()
    .int()
    .min(1900, {
      message: 'Year must be greater than 1900',
    })
    .max(new Date().getFullYear(), {
      message: 'Year must be less than current year',
    }),
  description: z.string().min(10, {
    message: 'Description is too short',
  }),
})
