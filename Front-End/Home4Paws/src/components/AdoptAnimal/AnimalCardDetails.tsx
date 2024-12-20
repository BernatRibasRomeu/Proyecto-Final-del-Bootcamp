import React from 'react';
import type Animal from '../../classes/Animal';
import { MapPin, Calendar, Heart, Info, Star, Shield } from 'lucide-react';


interface AnimalCardDetailsProps {
    animal: Animal;
  }
  
  export const AnimalCardDetails: React.FC<AnimalCardDetailsProps> = ({ animal }) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">{animal.nombre}</h2>
        <p className="text-lg text-gray-600">{animal.tipo} • {animal.raza || 'Raza mixta'}</p>
      </div>
  
      <div className="grid gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>{animal.lugar}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-green-500" />
          <span>{animal.edad}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Heart className="w-5 h-5 text-pink-500" />
          <span>{animal.sexo}</span>
        </div>
      </div>
  
      {animal.descripcion && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Info className="w-5 h-5 text-purple-500" />
            <h3>Descripció</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{animal.descripcion}</p>
        </div>
      )}
  
      {animal.preferencias && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3>Preferències</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{animal.preferencias}</p>
        </div>
      )}
  
      {animal.necesidades && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Shield className="w-5 h-5 text-red-500" />
            <h3>Necessitats especials</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{animal.necesidades}</p>
        </div>
      )}
    </div>
  );