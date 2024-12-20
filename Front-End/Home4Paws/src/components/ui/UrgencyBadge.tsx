import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { classNames } from '../../utils/utils';

interface UrgencyBadgeProps {
    urgency: number;
  }
  
  export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency }) => {
    if (urgency < 4) return null;
  
    return (
      <div
        className={classNames(
          'absolute top-4 right-4 px-4 py-2 rounded-full',
          'flex items-center gap-2',
          'bg-red-500 text-white shadow-lg',
          'animate-pulse'
        )}
      >
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-medium">Urgente</span>
      </div>
    );
  };