import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { useAnimal } from '../Hooks/useAnimalById';
import AnimalInfo from '../components/AdoptionPage/AnimalInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { donationSchema } from '../components/forms';
import type { z } from 'zod';

type DonationForm = z.infer<typeof donationSchema>;

const DonationPage: React.FC = () => {
  const { id } = useParams();
  const { animal, loading, error } = useAnimal(id);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
  });

  const onSubmit = async (data: DonationForm) => {
    const emitterId = localStorage.getItem('userId'); // Obtenir l'ID de l'usuari des de LocalStorage
  
    if (!emitterId) {
      toast.error("Has d'iniciar sessió abans");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/home4paws/animals/${id}`);
      if (!response.ok) {
        throw new Error("No s'ha pogut obtenir la informació");
      }
  
      const animalData = await response.json();
      const reciverId = animalData.userId;
  
      if (!reciverId) {
        throw new Error("L'animal no té cap usuari assignat");
      }
  
      const parsedEmitterId = parseInt(emitterId, 10);
      const parsedAnimalId = parseInt(id || '', 10);
  
      if (isNaN(parsedEmitterId)) {
        throw new Error("L'ID de l'emissor no és vàlid.");
      }
      if (isNaN(parsedAnimalId)) {
        throw new Error("L'ID de l'animal no és vàlid.");
      }
  
      const body = {
        amount: data.amount,
        fullname: data.fullName,
        email: data.email,
        message: data.message,
        reciverId,
        emitterId: parsedEmitterId,
        animal_id: parsedAnimalId,
      };
    
      const postResponse = await fetch('http://localhost:8080/home4paws/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!postResponse.ok) {
        throw new Error("No s'ha pogut processar la donació. Si us plau, intenta-ho de nou.");
      }
  
      toast.success("Donació realitzada amb èxit! Gràcies per la teva ajuda.");
    } catch (error: any) {
      console.error('Error al realitzar la donació:', error);
      toast.error(error.message || "S'ha produït un error al processar la donació.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;
  if (!animal) return <div className="text-gray-600 text-center p-4">Animal no trobat</div>;

  return (
    <div className="max-w-5xl mx-auto mt-14"><br />
      <div className="flex items-center justify-center mb-8">
        <PawPrint className="w-12 h-12 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900 ml-4">Fer una donació</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimalInfo animal={animal} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Formulari de donació</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantitat a donar (€)
                </label>
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Introdueix la quantitat"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="El teu nom complet"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correu electrònic
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Missatge (opcional)
                </label>
                <textarea
                  {...register('message')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Escriu un missatge..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processant...' : 'Fer una donació'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;

