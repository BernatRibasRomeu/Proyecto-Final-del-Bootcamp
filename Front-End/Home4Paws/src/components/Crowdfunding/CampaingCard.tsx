import { Link } from 'react-router-dom';
import { Progress } from '../ui/Progress';
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
            className="h-48 w-full rounded-lg object-cover"
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
                Recaptats: {raised}€
            </span>
            <span className="text-muted-foreground">{remainingTime}</span>
          </div>

          <Progress value={percentageRaised} className="h-2" />

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


// // import { Link } from 'react-router-dom';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { Clock, Heart, Target } from 'lucide-react';
// import type { CrowdfundingCampaign } from '@/types/crowdfunding';
// import { cn } from '@/lib/utils';

// interface CrowdfundingCardProps extends CrowdfundingCampaign {
//   index: number;
// }

// export function CrowdfundingCard({
//   image,
//   type,
//   name,
//   campaignTitle,
//   description,
//   raised,
//   target,
//   remainingTime,
//   index,
// }: CrowdfundingCardProps) {
//   const percentageRaised = Math.min((raised / target) * 100, 100);

//   return (
//     <Link 
//       to={`/campaign/${index}`} 
//       className="group block transform transition-all duration-300 hover:-translate-y-1"
//     >
//       <div className="relative h-full overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl">
//         {/* Image Container */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//           <img
//             src={image}
//             alt={campaignTitle}
//             className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-x-0 bottom-0 p-4">
//             <h3 className="text-lg font-medium text-white">{name}</h3>
//             <p className="mt-1 text-sm text-white/80">{campaignTitle}</p>
//           </div>
//           <Badge
//             variant="secondary"
//             className="absolute right-3 top-3 bg-white/90 text-black"
//           >
//             {type}
//           </Badge>
//         </div>

//         {/* Content */}
//         <div className="space-y-4 p-4">
//           {/* Description */}
//           <p className="line-clamp-2 text-sm text-muted-foreground">
//             {description}
//           </p>

//           {/* Progress Section */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-1.5">
//                 <Heart className="h-4 w-4 text-primary" />
//                 <span className="font-medium">${raised} raised</span>
//               </div>
//               <span className="font-medium">${target} goal</span>
//             </div>

//             <Progress 
//               value={percentageRaised} 
//               className={cn(
//                 "h-2 transition-colors",
//                 percentageRaised >= 100 ? "bg-green-100" : "bg-primary/20"
//               )}
//             />

//             {/* Stats */}
//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Target className="h-3.5 w-3.5" />
//                 <span>{Math.round(percentageRaised)}% Complete</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Clock className="h-3.5 w-3.5" />
//                 <span>{remainingTime}</span>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="pt-2">
//             <div
//               className="group/button relative w-full overflow-hidden rounded-lg bg-primary p-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 <Heart className="h-4 w-4" />
//                 Support Campaign
//               </span>
//               <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform group-hover/button:translate-x-0" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }