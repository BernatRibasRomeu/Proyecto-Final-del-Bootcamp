import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useAnimal } from '../Hooks/useAnimalById';
import AnimalInfo from '../components/AdoptionPage/AnimalInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { adoptionSchema } from '../components/forms';
import type { z } from 'zod';

type AdoptionForm = z.infer<typeof adoptionSchema>;

const AdoptionPage: React.FC = () => {
  const { id } = useParams();
  const { animal, loading, error } = useAnimal(id);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionForm>({
    resolver: zodResolver(adoptionSchema),
  });

  const onSubmit = async (data: AdoptionForm) => {
    const emitterId = localStorage.getItem('userId'); // Obtener el ID del usuario desde LocalStorage
  
    if (!emitterId) {
      toast.error('Debes iniciar sesión antes de enviar una solicitud de adopción.');
      return;
    }
  
    try {
      // Realiza el fetch para obtener el animal y su reciver_id (userId)
      const response = await fetch(`http://localhost:8080/home4paws/animals/${id}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener información del animal');
      }
      const animalData = await response.json();
      const reciverId = animalData.userId;
  
      if (!reciverId) {
        throw new Error('El propietario del animal no está definido.');
      }
  
      // Validar y convertir los IDs a números
      const parsedEmitterId = parseInt(emitterId, 10);
      const parsedAnimalId = parseInt(id || '', 10);
  
      if (isNaN(parsedEmitterId)) {
        throw new Error('El ID del emisor es inválido.');
      }
      if (isNaN(parsedAnimalId)) {
        throw new Error('El ID del animal es inválido.');
      }
  
      // Prepara el body para la solicitud POST
      const body = {
        name: data.firstName,
        surname: data.lastName,
        email: data.email,
        telephone: data.phone, // Asegúrate de que esté en formato string
        place: data.address,
        message: data.reason,
        reciverId, // Campo reciver_id
        emitterId: parsedEmitterId, // Campo emitter_id
        animal_id: parsedAnimalId, // Campo animal_id
        status: 'Pendiente',
      };
  
      // Realiza la solicitud POST para crear la petición
      const postResponse = await fetch('http://localhost:8080/home4paws/petitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!postResponse.ok) {
        throw new Error('No se pudo crear la petición. Por favor, inténtalo de nuevo.');
      }
  
      toast.success('¡Solicitud de adopción enviada con éxito! Nos pondremos en contacto contigo pronto.');
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error al enviar la solicitud.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;
  if (!animal) return <div className="text-gray-600 text-center p-4">Animal no trobat</div>;

  return (
    <div className="max-w-5xl mx-auto mt-14"><br></br>
      <div className="flex items-center justify-center mb-8">
        <Heart className="w-12 h-12 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900 ml-4"> Sol·licitud d'adopció</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimalInfo animal={animal} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Formulario de Adopción</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="El teu nom"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cognoms
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Els teus Cognoms"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Correu electrònic
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Telèfon
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="El teu número de telèfon"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Direcció
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Tu dirección completa"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Per què vols adoptar?
                </label>
                <textarea
                  {...register('reason')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={4}
                  placeholder="Cuéntanos por qué quieres adoptar y qué tipo de hogar puedes ofrecer..."
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  {...register('terms')}
                  className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="ml-2 text-sm text-gray-600">
                Accepto les condicions d'adopció i em comprometo a proporcionar una llar adequada per l'animal
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviant....' : ' Envia la Sol·licitud'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionPage;