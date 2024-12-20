import React from 'react';
import type Animal from '../../classes/Animal';
import { PawPrint, MapPin, Heart, Calendar, Users } from 'lucide-react';

interface AnimalInfoProps {
  animal: Animal;
}

const AnimalInfo: React.FC<AnimalInfoProps> = ({ animal }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full">
        <img
          src={animal.foto}
          alt={animal.nombre}
          className="w-full h-full object-cover"
        />
        {animal.urgencia > 3 && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-medium">Cas urgent</span>
          </div>
        )}
      </div>

      {/* Animal Details */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{animal.nombre}</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5" />
                <span>{animal.tipo} • {animal.raza}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{animal.lugar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Characteristics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Edat</span>
            </div>
            <p className="text-gray-900">{animal.edad}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-5 h-5" />
              <span className="font-medium">Sexe</span>
            </div>
            <p className="text-gray-900">{animal.sexo}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Protectora</span>
            </div>
            <p className="text-gray-900">{animal.protectora}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre {animal.nombre}</h3>
          <p className="text-gray-700 leading-relaxed">{animal.descripcion}</p>
          
          {/* Additional Info */}
          {animal.preferencias && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Preferencies</h4>
              <p className="text-gray-700">{animal.preferencias}</p>
            </div>
          )}
          
          {animal.necesidades && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Necessitats especials</h4>
              <p className="text-gray-700">{animal.necesidades}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;