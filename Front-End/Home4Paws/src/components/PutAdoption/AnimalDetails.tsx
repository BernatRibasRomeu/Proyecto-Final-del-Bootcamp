import { UseFormReturn } from "react-hook-form"
import { useState } from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { Input } from "../ui/Input"

const animals = ["Gos", "Gat", "Conill", "Ocell"]
const ageOptions = ["Jove", "Adult", "Vell"]
const races = {
  Gos: ["Labrador", "Bulldog", "Pastor Alemán", "Golden Retriever","Chihuahua"],
  Gat: ["Persa", "Siamés", "Maine Coon", "Bengalí","Ragdoll"],
  Conill: ["Mini Lop", "Holandés", "Rex", "Angora","Californiano"],
  Ocell: ["Periquito", "Canario", "Agapornis", "Cacatúa","Ninfa"],
}

interface AnimalDetailsProps {
  form: UseFormReturn<any>
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function AnimalDetails({ form }: AnimalDetailsProps) {
  const selectedAnimal = form.watch("animal")
  const [sexOptions, setSexOptions] = useState<string[]>([])

  const updateSexOptions = () => {
    const baseOptions = selectedAnimal === 'Conill' 
      ? ['Femella', 'Mascle']
      : ['Femella', 'Mascle', 'Intersex'];
    setSexOptions(shuffleArray(baseOptions));
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la mascota</FormLabel>
            <FormControl>
              <Input placeholder="Introdueix el nom de la mascota" {...field} required/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="animal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipus d'animal</FormLabel>
            <Select onValueChange={(value) => {
              field.onChange(value);
              // Reset sex field when animal changes to prevent invalid selections
              form.setValue('sexe', '');
              // Update sex options when animal changes
              updateSexOptions();
            }} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipus d'animal" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {animals.map((animal) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
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
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Edat</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona l'edat" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ageOptions.map((age) => (
                  <SelectItem key={age} value={age}>
                    {age}
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
        name="sex"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sexe</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              onOpenChange={(open) => {
                if (open) {
                  updateSexOptions();
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el sexe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sexOptions.map((sex) => (
                  <SelectItem key={sex} value={sex}>
                    {sex}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedAnimal && (
        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raça</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la raça" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {races[selectedAnimal as keyof typeof races].map((race) => (
                    <SelectItem key={race} value={race}>
                      {race}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}