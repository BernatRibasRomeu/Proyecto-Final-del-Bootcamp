import { useState, useEffect } from 'react';
import  Animal from '../classes/Animal';

export function useAnimal(id: string | undefined) {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Si no hay id, no hacer nada.

    const fetchAnimal = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/home4paws/animals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch animal data');
        }
        const data = await response.json();

        // Crear una instancia de la clase Animal con los datos
        const fetchedAnimal = new Animal(
          data.id,
          data.name,
          data.animal,
          data.age,
          data.sex,
          data.image_url,
          data.race,
          data.protectora,
          data.place,
          data.urgency,
          data.description,
          data.preferences,
          data.needs
        );
        
        setAnimal(fetchedAnimal);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  return { animal, loading, error };
}