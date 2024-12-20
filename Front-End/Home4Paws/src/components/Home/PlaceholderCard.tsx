import React from 'react';

export function PlaceholderCard() {
  return (
    <div className="h-full animate-pulse rounded-lg border bg-card p-4">
      <div className="relative mb-4 h-48 w-full rounded-xl bg-gray-300"></div>
      <div className="h-6 w-3/4 rounded bg-gray-300 mb-2"></div>
      <div className="h-5 w-1/2 rounded bg-gray-300 mb-2"></div>
      <div className="h-4 w-full rounded bg-gray-200 mb-2"></div>
      <div className="h-4 w-5/6 rounded bg-gray-200 mb-2"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
        <div className="h-8 w-full rounded bg-gray-300"></div>
      </div>
    </div>
  );
}

export default PlaceholderCard;
