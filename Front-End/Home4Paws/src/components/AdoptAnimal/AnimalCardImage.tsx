import React from 'react';
import { UrgencyBadge } from '../ui/UrgencyBadge';
import { classNames } from '../../utils/utils';

interface AnimalCardImageProps {
    imageUrl: string;
    name: string;
    urgency: number;
    isExpanded: boolean;
  }
  
  export const AnimalCardImage: React.FC<AnimalCardImageProps> = ({
    imageUrl,
    name,
    urgency,
    isExpanded,
  }) => (
    <div
      className={classNames(
        'relative w-full h-full overflow-hidden',
        'transition-all duration-500'
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className={classNames(
          'w-full h-full object-cover transition-all duration-700',
          'hover:scale-105'
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {urgency >= 4 && <UrgencyBadge urgency={urgency} />}
    </div>
  );