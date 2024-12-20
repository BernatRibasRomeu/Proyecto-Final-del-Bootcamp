import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Badge } from '../ui/Badge';
import type { CrowdfundingCampaign } from '../../classes/Crowdfunding';

interface CrowdfundingCardProps extends CrowdfundingCampaign {
  index: number;
}

export function CrowdfundingCard({
  images,
  type,
  name,
  campaignTitle,
  description,
  raised,
  target,
  remainingTime,
  index,
}: CrowdfundingCardProps) {
  const percentageRaised = Math.min((raised / target) * 100, 100);

  return (
    <Link to={`/campaign/${index}`} className="block">
      <div className="group h-full rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
        <div className="relative mb-4">
          <img
            src={images[0]}
            alt={campaignTitle}
            className="h-48 w-full rounded-xl object-cover"
          />
          <Badge
            variant="secondary"
            className="absolute right-2 top-2"
          >
            {type}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold text-card-foreground">{name}</h3>
        <h4 className="mt-2 text-lg font-medium text-card-foreground">
          {campaignTitle}
        </h4>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-card-foreground">
                Recaptat: {raised}€
            </span>
            <span className="text-muted-foreground">{remainingTime}</span>
          </div>

          {/* Barra de progreso utilizando Material-UI */}
          <Box sx={{ width: '100%' }}>
            <LinearProgress 
              variant="determinate" 
              value={percentageRaised} 
              sx={{
                height: '8px', 
                borderRadius: '5px',
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#008f39',
                },
              }} 
            />
          </Box>

          <div className="flex justify-between text-sm">
            <span className="font-medium text-card-foreground">
              Objectiu: {target}€
            </span>
            <span className="text-muted-foreground">
              {Math.round(percentageRaised)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CrowdfundingCard;
