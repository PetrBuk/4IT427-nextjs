'use client'

import { BrandSelect } from '@/lib/components/forms/brand-select'
import { ModelSelect } from '@/lib/components/forms/model-select'
import { Button } from '@/lib/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form'
import { Input } from '@/lib/components/ui/input'
import { Brand, CarModel } from '@prisma/client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const filterCarSchema = z.object({
  brand: z.string().min(3, {
    message: 'Car brand is required',
  }),
  model: z.string().min(3, {
    message: 'Car model is required',
  }),
  location: z.string(),
})

type CarFilterFormProps = {
  brands: Brand[]
  models: CarModel[]
}

export const CarFilterForm = ({ brands, models }: CarFilterFormProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const form = useForm<z.infer<typeof filterCarSchema>>({
    defaultValues: {
      brand: params.get('brand') || '',
      model: params.get('model') || '',
      location: params.get('location') || '',
    },
  })

  const handleSubmit = (data: z.output<typeof filterCarSchema>) => {
    router.push(
      `?location=${data.location}&brand=${data.brand}&model=${data.model}`
    )
  }

  const handleClear = () => {
    router.push('/')
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2 md:flex-row md:gap-4"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <BrandSelect name="brand" control={form.control} brands={brands} />
        <ModelSelect
          brandFieldName="brand"
          name="model"
          control={form.control}
          models={models}
        />

        <div className="flex flex-row mt-auto ml-auto gap-2 ">
          <Button type="submit">Filter</Button>

          <Button
            type="button"
            onClick={handleClear}
            variant="outline"
            className="mt-auto"
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  )
}
