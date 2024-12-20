import React from 'react';

interface CharacteristicButtonsProps {
  characteristics: string[];
  activeCharacteristics: string[];
  onCharacteristicClick: (characteristic: string) => void;
}

export const CharacteristicButtons: React.FC<CharacteristicButtonsProps> = ({
  characteristics,
  activeCharacteristics,
  onCharacteristicClick,
}) => {
  const isButtonActive = (char: string) => activeCharacteristics.includes(char);

  return (
    <div className="flex flex-wrap gap-1.5">
      {characteristics.map((char, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onCharacteristicClick(char);
          }}
          className={`text-xs px-2 py-1 rounded-full transition-colors ${
            isButtonActive(char)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {char}
        </button>
      ))}
    </div>
  );
};