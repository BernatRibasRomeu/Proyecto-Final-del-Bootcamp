import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CampaignDetails } from '../components/Crowdfunding/CampaingDetails';
import { DonationForm } from '../components/Crowdfunding/DonationForm';
import { CrowdfundingCampaign } from '../classes/Crowdfunding';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CampaignPage() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<CrowdfundingCampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Realiza el fetch para obtener los datos de la campaña
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:8080/home4paws/crowdfunding/${id}`);
        if (!response.ok) {
          throw new Error('Campaign not found');
        }
        const data = await response.json();

        // Decodificar la imagen de base64 a URL
        const decodedImages = [atob(data.images)];

        // Crear el objeto de la campaña
        const fetchedCampaign: CrowdfundingCampaign = {
          images: decodedImages,
          type: data.type,
          name: data.name,
          campaignTitle: data.campaigntitle,
          description: data.description,
          raised: data.raised,
          target: data.target,
          remainingTime: data.remainingtime,
        };

        setCampaign(fetchedCampaign);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const updateCampaign = async (donationAmount: number) => {
    if (!campaign) return;
  
    const updatedCampaign = {
      ...campaign,
      raised: campaign.raised + donationAmount,
    };
  
    try {
      const response = await fetch(`http://localhost:8080/home4paws/crowdfunding/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raised: updatedCampaign.raised,
          target: campaign.target,
          remainingtime: campaign.remainingTime,
        }),
      });
  
      if (!response.ok) {
        throw new Error('No s\'ha pogut actualitzar la campanya');
      }
  
      setCampaign(updatedCampaign);
  
      // Toast de éxito
      toast.success('Donació realitzada amb èxit! Gràcies pel teu suport!', {
        autoClose: 3000,
      });
    } catch (error) {
      // Toast de error
      toast.error('Hi ha hagut un problema amb la donació. Si us plau, torna-ho a intentar.', {
        autoClose: 5000,
      });
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!campaign) {
    return <div>Campanya no trobada</div>;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CampaignDetails campaign={campaign} />
          </div>
          <div>
            <DonationForm campaignTitle={campaign.campaignTitle} onDonate={updateCampaign} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;
