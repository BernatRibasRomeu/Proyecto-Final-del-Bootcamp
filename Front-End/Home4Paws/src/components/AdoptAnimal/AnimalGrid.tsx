import React from 'react';
import { PawPrint } from 'lucide-react';
import AnimalCard from './AnimalCard';
import type Animal from '../../classes/Animal';
import type { AnimalFilters } from '../../data/AnimalTypes';

interface AnimalGridProps {
  animals: Animal[];
  onCharacteristicClick: (characteristic: string) => void;
  filters: AnimalFilters;
  activeCharacteristics: string[];
}

export const AnimalGrid: React.FC<AnimalGridProps> = ({
  animals,
  onCharacteristicClick,
  filters,
  activeCharacteristics,
}) => {
  if (animals.length === 0) {
    return (
      <div className="text-center py-12 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
        <PawPrint className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No s'han trobat mascotes</h3>
        <p className="text-gray-600">Intenta ajustar els filtres de cerca</p>
      </div>
    );
  }

  // Ordenamos los animales por urgencia (de mayor a menor)
  const sortedAnimals = [...animals].sort((a, b) => b.urgencia - a.urgencia);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {sortedAnimals.map((animal, index) => (
        <AnimalCard
          key={index}
          animal={animal}
          onCharacteristicClick={onCharacteristicClick}
          activeCharacteristics={activeCharacteristics}
        />
      ))}
    </div>
  );
};
