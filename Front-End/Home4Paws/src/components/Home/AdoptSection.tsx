// src/components/AdoptSection.tsx

import React from 'react';
import HomeCards from './HomeCards';

const AdoptSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-[500px] py-12">
      <h2 className="text-3xl font-bold mb-8">Ajuda als Animals</h2>
      {/* Tarjetas responsivas */}
      <div className="flex flex-col gap-6 items-stretch md:items-center justify-center w-full px-4">
        <HomeCards />
      </div>
    </div>
  );
};

export default AdoptSection;
