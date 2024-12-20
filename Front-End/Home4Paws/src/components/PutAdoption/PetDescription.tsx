import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form"
import { Textarea } from "../ui/TextArea"

interface PetDescriptionProps {
  form: UseFormReturn<any>
}

export function PetDescription({ form }: PetDescriptionProps) {
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripció</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Com es la mascota?"
                className="min-h-[100px]"
                {...field} required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferencies</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Quin tipus de casa seria ideal?"
                className="min-h-[100px]"
                {...field} required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="needs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Necessitats especials</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Té alguna necessitat especial?"
                className="min-h-[100px]"
                {...field} required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}