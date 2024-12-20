import React, { useState, useEffect } from 'react';
import CrowdfundingCard from './CrowdfundingCard';
import PlaceholderCard from './PlaceholderCard';
import { CrowdfundingCampaign } from '../../classes/Crowdfunding';

export function CrowdfundingSection() {
  const [campaigns, setCampaigns] = useState<CrowdfundingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8080/home4paws/crowdfunding');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();

        const decodedCampaigns = data.map((campaign: any) => ({
          images: [atob(campaign.images)],
          type: campaign.type,
          name: campaign.name,
          campaignTitle: campaign.campaigntitle,
          description: campaign.description,
          raised: campaign.raised,
          target: campaign.target,
          remainingTime: campaign.remainingtime,
        }));

        setCampaigns(decodedCampaigns);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4" id="support-campaigns">
        <h2 className="mb-8 text-center text-3xl font-bold">
        Donar suport a una campanya
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <PlaceholderCard key={index} />
              ))
            : campaigns.map((campaign, index) => (
                <CrowdfundingCard key={index + 1} {...campaign} index={index + 1} />
              ))}
        </div>
      </div>
    </section>
  );
}

export default CrowdfundingSection;
