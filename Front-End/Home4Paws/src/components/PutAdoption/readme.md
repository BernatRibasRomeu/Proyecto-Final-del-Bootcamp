Make this better visually
import React, { useState } from "react";
import axios from "axios";

const PutAdoption: React.FC = () => {
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [formData, setFormData] = useState({
name: "",
animal: "",
age: "",
sex: "",
IMAGE_URL: "",
race: "",
protectora: "",
place: "",
urgency: "",
description: "",
preferences: "",
needs: "",
});

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file) {
const fileURL = URL.createObjectURL(file);
setImagePreview(fileURL);
setFormData({ ...formData, IMAGE_URL: fileURL }); // Agregar al formData
}
};

const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
event.preventDefault();
const file = event.dataTransfer.files?.[0];
if (file) {
const fileURL = URL.createObjectURL(file);
setImagePreview(fileURL);
setFormData({ ...formData, IMAGE_URL: fileURL }); // Agregar al formData
}
};

// Al seleccionar un animal, sincronizarlo con formData
const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
const selected = e.target.value;
setSelectedAnimal(selected);
setFormData({ ...formData, animal: selected }); // Guardar en formData
setShuffledraces([]); // Restablecer las razas disponibles
setShuffledSexOptions([]); // Restablecer las opciones de sexo
};

const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
event.preventDefault();
};

const handleRemoveImage = () => {
setImagePreview(null);
};

const handleInputChange = (
e: React.ChangeEvent<
HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();


// Convert image to Base64 if preview exists
let imageBase64 = "";
if (imagePreview) {
  const imageFile = await fetch(imagePreview)
    .then(response => response.blob())
    .then(blob => new File([blob], "image.jpg"));
  
  const reader = new FileReader();
  reader.onloadend = () => {
    imageBase64 = reader.result as string;
    const formDataToSend = new FormData();

    // Add all form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("animal", formData.animal);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("sex", formData.sex);
    formDataToSend.append("race", formData.race);
    formDataToSend.append("place", formData.place);
    formDataToSend.append("protectora", formData.protectora);
    formDataToSend.append("urgency", formData.urgency.toString());
    formDataToSend.append("description", formData.description);
    formDataToSend.append("preferences", formData.preferences);
    formDataToSend.append("needs", formData.needs);
    
    // Add the Base64 string to the form data
    formDataToSend.append("image_url", imageBase64);

    // Send the request
    axios.post(
      "http://localhost:8080/home4paws/animals",
      formDataToSend,
      { headers: { "Content-Type": "application/json" } }
    )
    .then(response => {
      alert("Animal added successfully.");
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error adding animal:", error);
      alert("Error adding animal.");
    });
  };

  reader.readAsDataURL(imageFile);
}
};

const animals = ["Perro", "Gato", "Conejo", "Pajaro"];
const ageOptions = ["Joven", "Adulto", "Viejo"];
const sexOptions = ["Intersex", "Hembra", "Macho"];
const rabbitSexOptions = ["Hembra", "Macho"];

const races: Record<string, string[]> = {
Perro: ["Labrador", "Bulldog", "Beagle", "Poodle"],
Gato: ["Persian", "Siamese", "Maine Coon", "Sphynx"],
Conejo: ["Netherland Dwarf", "Lionhead", "Rex", "Flemish Giant"],
Pajaro: ["Parrot", "Canary", "Finch", "Cockatiel"],
};

const [selectedAnimal, setSelectedAnimal] = useState<string>("");
const [shuffledAnimals, setShuffledAnimals] = useState<string[]>([]);
const [shuffledSexOptions, setShuffledSexOptions] = useState<string[]>([]);
const [shuffledraces, setShuffledraces] = useState<string[]>([]);

const shuffleArray = (array: string[]) => {
return array.slice().sort(() => Math.random() - 0.5);
};

const handleAnimalDropdownClick = () => {
setShuffledAnimals(shuffleArray(animals));
};

const handleSexDropdownClick = () => {
if (selectedAnimal) {
const options =
selectedAnimal === "Conejo" ? rabbitSexOptions : sexOptions;
setShuffledSexOptions(shuffleArray(options));
}
};

const handleraceDropdownClick = () => {
if (selectedAnimal) {
setShuffledraces(shuffleArray(races[selectedAnimal]));
}
};

return (
<section className="bg-gray-100">
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
<div className="rounded-lg bg-white p-8 shadow-lg">
<form action="#" className="space-y-4" onSubmit={handleSubmit}>
<div>
<label className="block text-sm font-medium" htmlFor="name">
Nombre
</label>
<input
className="w-full rounded-lg border-gray-200 p-3 text-sm"
placeholder="Nombre"
type="text"
id="name"
name="name"
value={formData.name}
onChange={handleInputChange}
/>
</div>


        {/* Tipo de Animal */}
        <div>
          <label className="block text-sm font-medium" htmlFor="animal">
            Tipo de Animal
          </label>
          <select
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            id="animal"
            name="animal"
            value={selectedAnimal}
            onChange={handleAnimalChange} // Usar la nueva función
            onClick={handleAnimalDropdownClick}
          >
            <option value="">Introduce un campo</option>
            {shuffledAnimals.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </div>

        {/* Sexo */}
        {selectedAnimal && (
          <div>
            <label className="block text-sm font-medium" htmlFor="sex">
              Sexo
            </label>
            <select
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              onClick={handleSexDropdownClick}
            >
              <option value="">Introduce un campo</option>
              {shuffledSexOptions.map((sex) => (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Edad */}
        <div>
          <label className="block text-sm font-medium" htmlFor="age">
            Edad
          </label>
          <select
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          >
            <option value="">Introduce un campo</option>
            {shuffleArray(ageOptions).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        {/* Raza */}
        {selectedAnimal && (
          <div>
            <label className="block text-sm font-medium" htmlFor="race">
              Raza
            </label>
            <select
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              id="race"
              name="race"
              onClick={handleraceDropdownClick}
              value={formData.race}
              onChange={handleInputChange}
            >
              <option value="">Introduce un campo</option>
              {shuffledraces.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Imagen*/}

        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="relative flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!imagePreview ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 z-10 bg-black text-white rounded-full p-1 hover:bg-red-600"
                  aria-label="Remove image"
                >
                  ✕
                </button>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="protectora">
            Protectora
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nombre de la protectora"
            type="text"
            id="protectora"
            name="protectora"
            value={formData.protectora}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="place">
            Lugar
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Ubicación"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="urgency">
            Urgencia (1-5)
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            type="number"
            id="urgency"
            name="urgency"
            min="1"
            max="5"
            value={formData.urgency}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Descripción"
            rows={4}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label
            className="block text-sm font-medium"
            htmlFor="preferences"
          >
            Preferencias
          </label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Preferencias"
            rows={4}
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="needs">
            Necesidades
          </label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Necesidades"
            rows={4}
            id="needs"
            name="needs"
            value={formData.needs}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
);
};
export default PutAdoption;