'use client'

import { CarModel } from '@prisma/client'
import {
  Control,
  FieldValues,
  Path,
  useController,
  useWatch,
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useEffect } from 'react'

type ModelSelectProps<FormSchema extends FieldValues> = {
  models: CarModel[]
  control: Control<FormSchema>
  name: Path<FormSchema>
  brandFieldName: Path<FormSchema>
}

export function ModelSelect<FormSchema extends FieldValues>({
  models,
  control,
  name,
  brandFieldName,
}: ModelSelectProps<FormSchema>) {
  const brandField = useWatch({ control, name: brandFieldName })
  const controller = useController({ control, name })

  const filteredModels = models.filter((model) => {
    if (!brandField) return true

    return model.brandId === brandField
  })

  useEffect(() => {
    controller.field.onChange('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandField])

  return (
    <FormField
      name={name}
      render={() => (
        <FormItem key={controller.field.value}>
          <FormLabel>Model</FormLabel>
          <Select
            onValueChange={controller.field.onChange}
            value={controller.field.value}
          >
            <FormControl>
              <SelectTrigger className="min-w-40">
                <SelectValue placeholder="Select car model" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {filteredModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
