import React from 'react';

const PlaceholderAnimalCard: React.FC = () => {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-200 animate-pulse shadow-lg flex flex-row h-[280px]">
      {/* Imagen del lado izquierdo */}
      <div className="w-1/2 bg-gray-300"></div>

      {/* Contenido del lado derecho */}
      <div className="w-1/2 p-4 flex flex-col">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="space-y-1 mb-3">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mt-auto space-y-2">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderAnimalGrid: React.FC = () => {
  const placeholders = Array.from({ length: 6 }); // Número de *cards* ficticias

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {placeholders.map((_, index) => (
        <PlaceholderAnimalCard key={index} />
      ))}
    </div>
  );
};
