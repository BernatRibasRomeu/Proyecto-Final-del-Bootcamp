import React from 'react';
import { Activity, PawPrint } from 'lucide-react';

interface DashboardStats {
  totalReceived: number;
  totalSent: number;
  pendingPetitions: number;
}

export default function DashboardHeader({ stats }: { stats: DashboardStats }) {
  return (
    <div className="mb-8 mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <PawPrint className="text-blue-600" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">El meu Taulell</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-green-600" size={20} />
            <h3 className="font-semibold text-green-800">Donacions rebudes</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">${stats.totalReceived}</p>
        </div>
        
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-red-600" size={20} />
            <h3 className="font-semibold text-red-800">Donacions enviades</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">${stats.totalSent}</p>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <PawPrint className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-800">Peticions pendents</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{stats.pendingPetitions}</p>
        </div>
      </div>
    </div>
  );
}