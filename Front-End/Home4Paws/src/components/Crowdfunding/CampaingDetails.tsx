import { CrowdfundingCampaign } from '../../classes/Crowdfunding';
import { Badge } from '../ui/Badge';
import { Clock, Target, Users } from 'lucide-react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Slider from 'react-slick';


interface CampaignDetailsProps {
  campaign: CrowdfundingCampaign;
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  const percentageRaised = Math.min((campaign.raised / campaign.target) * 100, 100);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="space-y-6">
      <div className="relative ">
        {campaign.images.length > 1 ? (
          <Slider {...settings}>
            {campaign.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${campaign.campaignTitle} - ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-xl"
              />
            ))}
          </Slider>
        ) : (
          <img
            src={campaign.images[0]}
            alt={campaign.campaignTitle}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        )}
        <Badge variant="secondary" className="absolute top-4 right-4">
          {campaign.type}
        </Badge>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{campaign.campaignTitle}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{campaign.name}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Recaptat: {campaign.raised}€</span>
            <span>Objectiu: {campaign.target}€</span>
          </div>

          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={percentageRaised}
              sx={{
                height: '10px',
                borderRadius: '5px',
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#008f39',
                },
              }}
            />
          </Box>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{Math.round(percentageRaised)}% Aconseguit</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{campaign.remainingTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Sobre aquesta campanya</h2>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
      </div>
    </div>
  );
}
