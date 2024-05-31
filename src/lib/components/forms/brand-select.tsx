import { Brand } from '@prisma/client'
import { Control, FieldValues, Path } from 'react-hook-form'
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

type BrandSelectProps<FormSchema extends FieldValues> = {
  brands: Brand[]
  control: Control<FormSchema>
  name: Path<FormSchema>
}

export function BrandSelect<FormSchema extends FieldValues>({
  brands,
  control,
  name,
}: BrandSelectProps<FormSchema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem key={field.value}>
          <FormLabel>Brand</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="min-w-40">
                <SelectValue placeholder="Select car brand" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
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
