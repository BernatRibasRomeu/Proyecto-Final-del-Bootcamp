import React, { useState, useEffect, useId } from 'react';
import PetitionCard from '../components/Dashboard/PetitionCard';
import DonationCard from '../components/Dashboard/DonationCard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { toast } from 'react-toastify';
import { Donation,Petition } from '../classes/Types';

function DashboardPage() {
  const [receivedDonations, setReceivedDonations] = useState<Donation[]>([]);
  const [sentDonations, setSentDonations] = useState<Donation[]>([]);
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener el userId desde LocalStorage
  const userId = localStorage.getItem('userId');
  //const userId = 1;

  useEffect(() => {
    if (!userId) {
      toast.error('Has d\'iniciar un compte');
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch donaciones enviadas
        const sentDonationsRes = await fetch(`http://localhost:8080/home4paws/donations/sent/${userId}`);
        if (!sentDonationsRes.ok) throw new Error('No hi ha cap donació enviada');
        const sentDonationsData = await sentDonationsRes.json();

        // Fetch donaciones recibidas
        const receivedDonationsRes = await fetch(`http://localhost:8080/home4paws/donations/recived/${userId}`);
        if (!receivedDonationsRes.ok) throw new Error('No hi ha cap donació rebuda');
        const receivedDonationsData = await receivedDonationsRes.json();

        // Fetch peticiones recibidas
        const petitionsRes = await fetch(`http://localhost:8080/home4paws/petitions/recived/${userId}`);
        if (!petitionsRes.ok) throw new Error('No hi ha cap petició rebuda.');
        const petitionsData = await petitionsRes.json();

        // Actualizar estados con los datos recibidos
        setSentDonations(sentDonationsData);
        setReceivedDonations(receivedDonationsData);
        setPetitions(petitionsData);
      } catch (error: any) {
        toast.error(error.message || 'Hi ha hagut algun error al carregar les dades.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  const stats = {
    totalReceived: receivedDonations.reduce((sum, d) => sum + d.amount, 0),
    totalSent: sentDonations.reduce((sum, d) => sum + d.amount, 0),
    pendingPetitions: petitions.length,
  };

  const handlePetitionResponse = (petitionId: number, accepted: boolean) => {
    console.log(`Petition ${petitionId} ${accepted ? 'accepted' : 'declined'}`);
    setPetitions(petitions.filter((p: Petition) => p.id !== petitionId));
  };

  if (isLoading) {
    return <div className="text-center py-10">Cargant dades...</div>;
  }

  if (!userId) {
    return <div className="text-center py-10">Siusplau, inicia sessió.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donations Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Donacions recents</h2>
            <div className="space-y-4">
              {receivedDonations.map((donation) => (
                <DonationCard
                  key={`received-${donation.id}`}
                  donation={donation}
                  type="received"
                />
              ))}
              {sentDonations.map((donation) => (
                <DonationCard
                  key={`sent-${donation.id}`}
                  donation={donation}
                  type="sent"
                />
              ))}
              {receivedDonations.length === 0 && sentDonations.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hi ha donacions rebudes o enviades.</p>
              )}
            </div>
          </div>

          {/* Petitions Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Peticions d'adopció</h2>
            <div className="space-y-4">
              {petitions.map((petition) => (
                <PetitionCard
                  key={petition.id}
                  petition={petition}
                  onRespond={handlePetitionResponse}
                />
              ))}
              {petitions.length === 0 && (
                <p className="text-gray-500 text-center py-4">No hi ha cap petició d'adopció</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;


