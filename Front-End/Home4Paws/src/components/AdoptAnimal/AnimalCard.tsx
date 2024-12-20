import React, { useState, useRef } from 'react';
import { AnimalCardImage } from './AnimalCardImage';
import { AnimalCardDetails } from './AnimalCardDetails';
import { useNavigate } from 'react-router-dom';
import { CharacteristicButtons } from './CharacteristicButtons';
import { classNames } from '../../utils/utils';
import type Animal from '../../classes/Animal';

import { X, Heart } from 'lucide-react';

interface AnimalCardProps {
  animal: Animal;
  onCharacteristicClick: (characteristic: string) => void;
  activeCharacteristics: string[];
}

const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onCharacteristicClick,
  activeCharacteristics,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const characteristics = [
    animal.tipo,
    animal.sexo,
    animal.edad,
    animal.raza,
    animal.lugar,
  ];

  const handleDonate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    navigate(`/donate/${animal.id}`);
  };

  const handleAdopt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    navigate(`/adopt/${animal.id}`);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={classNames(
          'relative rounded-xl overflow-hidden transition-all duration-300',
          'bg-white shadow-lg hover:shadow-xl cursor-pointer',
          'transform perspective-1000 hover:-translate-y-1',
          'flex flex-row h-[280px]'
        )}
        onClick={() => setIsExpanded(true)}
      >
        {/* Left side - Image */}
        <div className="w-1/2">
          <AnimalCardImage
            imageUrl={animal.foto}
            name={animal.nombre}
            urgency={animal.urgencia}
            isExpanded={false}
          />
        </div>

        {/* Right side - Content */}
        <div className="w-1/2 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{animal.nombre}</h3>
            <Heart className="w-5 h-5 text-pink-500 flex-shrink-0" />
          </div>

          <div className="space-y-1 mb-3">
            <p className="text-sm text-gray-600">
              {animal.edad} • {animal.sexo}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">{animal.lugar}</p>
          </div>

          {/* Characteristic buttons at the bottom */}
          <div className="mt-auto">
            <CharacteristicButtons
              characteristics={characteristics}
              activeCharacteristics={activeCharacteristics}
              onCharacteristicClick={onCharacteristicClick}
            />
          </div>
        </div>
      </div>

      {/* Expanded Card Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={classNames(
              'relative bg-white rounded-xl overflow-hidden',
              'w-full max-w-4xl max-h-[90vh] overflow-y-auto',
              'animate-card-popup shadow-2xl'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimalCardImage
                imageUrl={animal.foto}
                name={animal.nombre}
                urgency={animal.urgencia}
                isExpanded={true}
              />
              <div className="p-6 md:p-8">
                <AnimalCardDetails animal={animal} />
                {/* Botones de Donar y Adoptar */}
                <div className="flex justify-between mt-6">
                <button
                    onClick={handleDonate}
                    className="w-[48%] py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Donar
                  </button>
                  <button
                    onClick={handleAdopt}
                    className="w-[48%] py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    Adoptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimalCard;
