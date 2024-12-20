import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import provincias from '../../data/Provincias';
import gatoVideo from '../../assets/GatoVideo-1.mp4';

const HelpSection: React.FC = () => {
  // Estados para manejar las selecciones de los filtros
  const [animalType, setAnimalType] = useState<string>('Gos');
  const [province, setProvince] = useState<string>('');

  // Función para manejar el clic en el botón de búsqueda
  const handleSearchClick = () => {
    // Redirige a la página de adoptar con los parámetros seleccionados
    const searchParams = new URLSearchParams();
    searchParams.set('animal', animalType);
    searchParams.set('provincia', province);
    // Cambiar la ruta con los parámetros de búsqueda
    window.location.href = `/adopt?${searchParams.toString()}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 min-h-[500px] mt-16" id='VideoSection'>
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src={gatoVideo} type="video/mp4" />
      </video>

      {/* Texto principal */}
      <h1 className="text-4xl font-bold text-white mb-8 z-10 bg-black bg-opacity-50 p-4 rounded">
        El teu camí cap a una nova casa
      </h1>
      {/* Sección de filtros */}
      <div className="w-4/5 max-w-4xl bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 z-10">
        {/* Tipo de animal */}
        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="animal-type" className="text-white font-medium mb-2">
            Tipus d'Animal
          </label>
          <select
            id="animal-type"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option value="Gos">Gos</option>
            <option value="Gat">Gat</option>
            <option value="Conill">Conill</option>
            <option value="Ocell">Ocell</option>
          </select>
        </div>

        {/* Localización */}
        <div className="flex flex-col w-full md:w-1/3">
          <label htmlFor="location" className="text-white font-medium mb-2">
            Localització
          </label>
          <select
            id="location"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="p-2 rounded border border-gray-300 text-gray-800"
          >
            <option value="">Selecciona una provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de búsqueda */}
        <div className="flex w-full md:w-1/3 justify-center items-center">
          <button
            onClick={handleSearchClick}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            Cercar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
