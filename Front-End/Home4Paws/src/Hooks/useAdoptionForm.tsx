import { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  animal: string;
  age: string;
  sex: string;
  IMAGE_URL: string;
  race: string;
  protectora: string;
  place: string;
  urgency: string;
  description: string;
  preferences: string;
  needs: string;
}

const initialFormData: FormData = {
  name: '',
  animal: '',
  age: '',
  sex: '',
  IMAGE_URL: '',
  race: '',
  protectora: '',
  place: '',
  urgency: '',
  description: '',
  preferences: '',
  needs: '',
};

export function useAdoptionForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const animals = ['Gos', 'Gat', 'Conill', 'Ocell'];
  const ageOptions = ['Jove', 'Adult', 'Vell'];
  const sexOptions = ['Intersex', 'Femella', 'Mascle'];
  const rabbitSexOptions = ['Femella', 'Mascle'];

  const races: Record<string, string[]> = {
    Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Golden Retriever','Chihuahua'],
    Gato: ['Persa', 'Siamés', 'Maine Coon', 'Bengalí','Ragdoll'],
    Conejo: ['Mini Lop', 'Holandés', 'Rex', 'Angora','Californiano'],
    Pajaro: ['Periquito', 'Canario', 'Agapornis', 'Cacatúa','Ninfa'],
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setFormData({ ...formData, IMAGE_URL: fileURL });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, IMAGE_URL: '' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnimalChange = (e: { target: { value: string } }) => {
    const selected = e.target.value;
    setSelectedAnimal(selected);
    setFormData({ ...formData, animal: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imagePreview) {
      try {
        // Fetch the image and get it as a blob
        const response = await fetch(imagePreview);
        const blob = await response.blob();

        // Create form data
        const formDataToSend = new FormData();

        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== 'IMAGE_URL') {
            formDataToSend.append(key, value);
          }
        });

        // Add the image as application/octet-stream
        formDataToSend.append('image_url', blob, 'image.jpg');

        try {
          const response = await axios.post(
            'http://localhost:8080/home4paws/animals',
            formDataToSend,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          alert('Animal afegit amb èxit.');
          console.log(response.data);
          
          // Reiniciar el formulari després de l'enviament correcte
          setFormData(initialFormData);
          setImagePreview(null);
          setSelectedAnimal(''); 
          } catch (error) {
            console.error('Error afegint l\'animal:', error);
            alert('Error afegint l\'animal.');
          }
          } catch (error) {
            console.error('Error processant la imatge:', error);
            alert('Error processant la imatge.');
          }
          } else {
            alert('Si us plau, afegeix una imatge de la mascota.');
          }
          
    
  };

  return {
    formData,
    imagePreview,
    handleInputChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    selectedAnimal,
    handleAnimalChange,
    animals,
    ageOptions,
    sexOptions,
    races,
  };
}