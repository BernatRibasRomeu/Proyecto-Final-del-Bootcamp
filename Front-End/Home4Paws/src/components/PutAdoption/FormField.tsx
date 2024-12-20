import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: string[];
  placeholder?: string;
  rows?: number;
  min?: string;
  max?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  rows = 4,
  min,
  max,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
          >
            <option value="">Introdueix un camp</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
          />
        );
      default:
        return (
          <input
            type="text"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {renderInput()}
    </div>
  );
};