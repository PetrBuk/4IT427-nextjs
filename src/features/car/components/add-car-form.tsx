'use client'

import { locations } from '@/lib/catalogs/locations'
import { BrandSelect } from '@/lib/components/forms/brand-select'
import { ModelSelect } from '@/lib/components/forms/model-select'
import { Button } from '@/lib/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form'
import { Input } from '@/lib/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Brand, CarModel } from '@prisma/client'
import { Path, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCarSchema } from '../model/schema'
import { useFormState } from 'react-dom'
import { addCarFormHandler } from '@/actions/add-car-handler'
import { useEffect, useRef } from 'react'
import { getFormData } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type AddCarFormProps = {
  brands: Brand[]
  models: CarModel[]
}

export const AddCarForm = ({ brands, models }: AddCarFormProps) => {
  const router = useRouter()
  const [state, formAction] = useFormState(addCarFormHandler, {
    result: '',
    fields: {},
  })

  const form = useForm<z.infer<typeof createCarSchema>>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brand: '',
      model: '',
      location: '',
      price: 0,
      year: 0,
      description: '',
      ...(state?.fields ?? {}),
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.result === 'error') {
      state.errors?.forEach((error) => {
        form.setError(
          error.path.join('.') as Path<z.infer<typeof createCarSchema>>,
          { message: error.message }
        )
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    if (state.result === 'success') {
      router.push(`/car/${state.car.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a new car</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(() => {
                formAction(getFormData(form.getValues()))
              })(e)
            }}
            className="grid gap-8"
          >
            <BrandSelect control={form.control} name="brand" brands={brands} />

            <ModelSelect
              control={form.control}
              name="model"
              brandFieldName="brand"
              models={models}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New car year"
                      type="number"
                      {...field}
                      value={+field.value || ''}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="New car description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
