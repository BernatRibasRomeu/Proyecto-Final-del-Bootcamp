import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/Button"
import { Form } from "../ui/Form"
import { ImageUpload } from "./ImageUpload"
import { AnimalDetails } from "./AnimalDetails"
import { ShelterDetails } from "../PutAdoption/ShellterDetails"
import { PetDescription } from "./PetDescription"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { toast } from "sonner"
import { PawPrint } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters"),
    animal: z.string().min(1, "Si us plau, selecciona un tipus d'animal"),
    age: z.string().min(1, "Si us plau, selecciona una edat"),
    sex: z.string().min(1, "Si us plau, selecciona el sexe"),
    race: z.string().min(1, "Si us plau, selecciona la raça"),
    protectora: z.string().min(2, "El nom de la protectora ha de tenir almenys 2 caràcters"),
    place: z.string().min(2, "La ubicació ha de tenir almenys 2 caràcters"),
    urgency: z.string().min(1, "Si us plau, selecciona el nivell d'urgència"),
    description: z.string().min(10, "La descripció ha de tenir almenys 10 caràcters"),
    preferences: z.string().min(10, "Les preferències han de tenir almenys 10 caràcters"),
    needs: z.string().min(10, "Les necessitats han de tenir almenys 10 caràcters"),
    imageUrl: z.any(),
})

export function AdoptionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      animal: "",
      age: "",
      sex: "",
      race: "",
      protectora: "",
      place: "",
      urgency: "",
      description: "",
      preferences: "",
      needs: "",
      imageUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      const userId = localStorage.getItem("userId");  // Obtener el userId del localStorage
    
      if (userId) {
        formData.append("userId", userId);  // Agregar el userId al FormData
      } else {
        throw new Error("User ID no encontrado en localStorage.");
      }

      Object.entries(values).forEach(([key, value]) => {
        if (key === "imageUrl" && value instanceof File) {
          // Si es un archivo, agregarlo al FormData
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });
  
      const response = await fetch("http://localhost:8080/home4paws/animals", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to submit");
  
      toast.success("Mascota afegida amb èxit!");
      form.reset();
    } catch (error) {
      toast.error("No s'ha pogut afegir la mascota. Si us plau, intenta-ho un altre vegada.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 "><br /> <br />
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 p-2">
            <PawPrint className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Afegir una mascota d'adopció</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ImageUpload form={form} />
              <AnimalDetails form={form} />
              <ShelterDetails form={form} />
              <PetDescription form={form} />
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Enviar la mascota per a l'adopció
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}