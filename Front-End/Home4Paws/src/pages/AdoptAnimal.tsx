import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Usamos el hook para obtener los parámetros de la URL
import { PawPrint, Heart } from 'lucide-react';
import Animal from '../classes/Animal';
import { FilterBar } from '../components/AdoptAnimal/FilterBar';
import { AnimalGrid } from '../components/AdoptAnimal/AnimalGrid';
import { useAnimalFilters } from '../Hooks/UseAnimalFilters';
import { PlaceholderAnimalGrid } from '../components/AdoptAnimal/PlaceholderAnimalCard';


const AdoptAnimal: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { filters, activeCharacteristics, handleFilterChange, handleCharacteristicClick } = useAnimalFilters();

  const location = useLocation();

  // Obtener los parámetros de la URL (filtros)
  const queryParams = new URLSearchParams(location.search);
  const animalType = queryParams.get('animal') || '';  // Valor por defecto si no existe
  const province = queryParams.get('provincia') || '';

  // Establecer los filtros basados en los parámetros de la URL
  useEffect(() => {
    handleFilterChange('animal', animalType);
    handleFilterChange('provincia', province);
  }, [animalType, province, handleFilterChange]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:8080/home4paws/animals');
        const data = await response.json();

        const fetchedAnimals = data.map((animal: any) => {
          const imageUrl = animal.image_url.startsWith('data:') 
            ? animal.image_url 
            : convertImageToBase64(animal.image_url);

          return new Animal(
            animal.id,
            animal.name,
            animal.animal,
            animal.age,
            animal.sex,
            imageUrl,
            animal.race,
            animal.protectora,
            animal.place,
            animal.urgency,
            animal.description,
            animal.preferences,
            animal.needs
          );
        });

        setAnimals(fetchedAnimals);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  function convertImageToBase64(image: string): string {
    if (image.startsWith('data:image/') || image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    return image.replace(/\.octet-string$/, '.png');
  }

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = searchQuery === '' || animal.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      switch (key) {
        case 'provincia': return animal.lugar === value;
        case 'animal': return animal.tipo === value;
        case 'sexe': return animal.sexo === value;
        case 'edat': return animal.edad === value;
        case 'raça': return animal.raza === value;
        default: return true;
      }
    });
    return matchesSearch && matchesFilters;
  });

  if (animals.length === 0 && !searchQuery) {
    (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mt-7">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-rose-500" />
              <PawPrint className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 via-purple-600 to-blue-600 text-transparent bg-clip-text">
                Adopta una Mascota
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra tu compañero perfecto entre nuestros adorables animales que buscan un hogar lleno de amor
            </p>
          </div>
  
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
  
          <PlaceholderAnimalGrid/>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50"> <br />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-7">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-rose-500" />
            <PawPrint className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 via-purple-600 to-blue-600 text-transparent bg-clip-text">
            Adopta una Mascota
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Troba el teu company perfecte entre els nostres adorables animals que busquen una llar plena d'amor
          </p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <AnimalGrid
          animals={filteredAnimals}
          onCharacteristicClick={handleCharacteristicClick}
          filters={filters}
          activeCharacteristics={activeCharacteristics}
        />
      </div>
    </div>
  );
};

export default AdoptAnimal;
