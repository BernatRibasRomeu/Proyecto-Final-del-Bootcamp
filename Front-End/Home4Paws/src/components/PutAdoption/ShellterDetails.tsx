import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form"
import { Input } from "../ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"

interface ShelterDetailsProps {
  form: UseFormReturn<any>
}

export function ShelterDetails({ form }: ShelterDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="protectora"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la protectora o usuari</FormLabel>
            <FormControl>
              <Input placeholder="Introdueix el nom de la protectora o usuari" {...field} required/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="place"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Residencia</FormLabel>
            <FormControl>
              <Input placeholder="Introdueix la teva Ciutat" {...field} required/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="urgency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nivell d'urgència (1-Poc urgent/5-Molt urgent) </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el nivell d'urgència" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Nivell {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}