import React from 'react';
import { FilterOption } from '../../data/AnimalTypes';

interface FilterSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FilterOption[];
  placeholder: string;
  onOpen?: () => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  onOpen,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      onClick={onOpen}
      onFocus={onOpen}
      className="w-full p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}