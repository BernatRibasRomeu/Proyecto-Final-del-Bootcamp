import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "../ui/Card";
import { FormField, FormItem, FormLabel } from "../ui/Form";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  form: UseFormReturn<any>;
}

export function ImageUpload({ form }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file);
      setPreview(URL.createObjectURL(file)); // Crear la URL de vista previa
      form.setValue("imageUrl", file); // Establecer el archivo en el formulario
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  };
  
  

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Crear una URL para la vista previa
      form.setValue("imageUrl", file); // Establecer el archivo real en el formulario
    }
  };

  const handleRemove = () => {
    setPreview(null);
    form.setValue("imageUrl", "");
  };

  

  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={() => (
        <FormItem>
          <FormLabel>Pet Photo</FormLabel>
          <Card className="border-dashed">
            <CardContent className="p-0">
              <div
                className="relative flex h-64 cursor-pointer items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {!preview ? (
                  <div className="flex flex-col items-center space-y-2 p-8 text-center">
                    <ImagePlus className="h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Feu clic per pujar</span> o arrossega i deixa caure
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </CardContent>
          </Card>
        </FormItem>
      )}
    />
  );
}