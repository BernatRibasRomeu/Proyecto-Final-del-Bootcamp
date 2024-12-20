import { useState, useCallback } from 'react';
import { AnimalFilters } from '../data/AnimalTypes';
import { dogRaces, catRaces, rabbitRaces, birdRaces } from '../data/AnimalRaces';

/**
 * Hook que maneja el estado y las funciones para cambiar los filtros.
 * - Permite actualizar y gestionar los filtros seleccionados.
 * - También gestiona las características activas que son seleccionadas por el usuario.
 */
export function useAnimalFilters() {
  const [filters, setFilters] = useState<AnimalFilters>({
    provincia: '',
    animal: '',
    sexe: '',
    edat: '',
    raça: '',
  });

  const [activeCharacteristics, setActiveCharacteristics] = useState<string[]>([]);

  /**
   * Función para manejar los cambios en los filtros, actualizando el estado.
   */
  const handleFilterChange = useCallback((filterName: string, value: string) => {
    setFilters(prev => {
      const updated = { ...prev, [filterName]: value };
      setActiveCharacteristics(Object.values(updated).filter(Boolean));
      return updated;
    });
  }, []);

  /**
   * Función para manejar el click en una característica, cambiando el filtro asociado.
   */
  const handleCharacteristicClick = useCallback((characteristic: string) => {
    let filterType = '';
    if (['Gos', 'Gat', 'Conill', 'Ocell'].includes(characteristic)) {
      filterType = 'animal';
    } else if (['Mascle', 'Femella', 'Intersex'].includes(characteristic)) {
      filterType = 'sexe';
    } else if (['Jove', 'Adult', 'Vell'].includes(characteristic)) {
      filterType = 'edat';
    } else {
      // Check if the characteristic is a race
      const allRaces = [...dogRaces, ...catRaces, ...rabbitRaces, ...birdRaces];
      if (allRaces.some(race => race.value === characteristic)) {
        filterType = 'raça';
      } else {
        filterType = 'provincia';
      }
    }

    handleFilterChange(
      filterType,
      filters[filterType as keyof AnimalFilters] === characteristic ? '' : characteristic
    );
  }, [filters, handleFilterChange]);

  return {
    filters,
    activeCharacteristics,
    handleFilterChange,
    handleCharacteristicClick,
  };
}