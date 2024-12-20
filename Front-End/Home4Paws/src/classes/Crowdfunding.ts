export interface CrowdfundingCampaign {
  images: string[];
  type: 'Usuari' | 'Protectora';
  name: string;
  campaignTitle: string;
  description: string;
  raised: number;
  target: number;
  remainingTime: string;
}
