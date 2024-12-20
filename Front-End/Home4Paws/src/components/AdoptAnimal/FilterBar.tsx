import React, { useState, useCallback, useMemo } from 'react';
import { FilterSelect } from './FilterSelect';
import { SearchBar } from './SearchBar';
import { AnimalFilters, FilterOption } from '../../data/AnimalTypes';
import { dogRaces, catRaces, rabbitRaces, birdRaces } from '../../data/AnimalRaces';
import provincias from '../../data/Provincias';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: AnimalFilters;
  onFilterChange: (filterName: string, value: string) => void;
}

const animalOptions: FilterOption[] = [
  { value: 'Gos', label: 'Gos' },
  { value: 'Gat', label: 'Gat' },
  { value: 'Conill', label: 'Conill' },
  { value: 'Ocell', label: 'Ocell' },
];

const baseAgeOptions: FilterOption[] = [
  { value: 'Jove', label: 'Jove' },
  { value: 'Adult', label: 'Adult' },
  { value: 'Vell', label: 'Vell' },
];

const baseSexOptions: FilterOption[] = [
  { value: 'Mascle', label: 'Mascle' },
  { value: 'Femella', label: 'Femella' },
  { value: 'Intersex', label: 'Intersex' },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}) => {
  const [currentSexOptions, setCurrentSexOptions] = useState<FilterOption[]>(baseSexOptions);

  const updateSexOptions = useCallback(() => {
    const options = filters.animal === 'Conill'
      ? baseSexOptions.filter(option => option.value !== 'Intersex')
      : baseSexOptions;
    setCurrentSexOptions(shuffleArray([...options]));
  }, [filters.animal]);

  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange('animal', e.target.value);
    // Reset sex and race when animal changes
    onFilterChange('sexe', '');
    onFilterChange('raça', '');
    // Update sex options
    updateSexOptions();
  };

  const currentRaceOptions = useMemo(() => {
    switch (filters.animal) {
      case 'Gos':
        return dogRaces;
      case 'Gat':
        return catRaces;
      case 'Conill':
        return rabbitRaces;
      case 'Ocell':
        return birdRaces;
      default:
        return [];
    }
  }, [filters.animal]);

  return (
    <div className="space-y-6 mb-12 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <FilterSelect
          value={filters.provincia}
          onChange={(e) => onFilterChange('provincia', e.target.value)}
          options={provincias.map(p => ({ value: p, label: p }))}
          placeholder="Qualsevol Província"
        />
        <FilterSelect
          value={filters.animal}
          onChange={handleAnimalChange}
          options={animalOptions}
          placeholder="Qualsevol Animal"
        />
        <FilterSelect
          value={filters.sexe}
          onChange={(e) => onFilterChange('sexe', e.target.value)}
          options={currentSexOptions}
          placeholder="Qualsevol Sexe"
          onOpen={updateSexOptions}
        />
        <FilterSelect
          value={filters.edat}
          onChange={(e) => onFilterChange('edat', e.target.value)}
          options={baseAgeOptions}
          placeholder="Qualsevol Edat"
        />
        <FilterSelect
          value={filters.raça}
          onChange={(e) => onFilterChange('raça', e.target.value)}
          options={currentRaceOptions}
          placeholder="Qualsevol Raça"
          //disabled={!filters.animal}
        />
      </div>
    </div>
  );
};