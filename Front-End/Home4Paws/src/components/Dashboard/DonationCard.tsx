import React from 'react';
import type { Donation,Animal } from '../../classes/Types';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
interface DonationCardProps {
  donation: Donation;
  type: 'received' | 'sent';
}

export default function DonationCard({ donation, type }: DonationCardProps) {
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/home4paws/animals/${donation.animal_id}`)
      .then(res => res.json())
      .then(data => setAnimal(data))
      .catch(err => console.error('Error fetching animal:', err));
  }, [donation.animal_id]);

  if (!animal) return null;

  return (
    <div className={`rounded-xl shadow-sm p-4 border transition-all hover:shadow-md ${
      type === 'received' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
    }`}>
      <div className="flex gap-4">
        <img 
          src={animal.image_url} 
          alt={animal.name}
          className="w-24 h-24 object-cover rounded-lg shadow-sm"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{animal.name}</h3>
              <p className="text-sm text-gray-600">{donation.fullname}</p>
            </div>
            <p className={`font-bold text-lg ${
              type === 'received' ? 'text-green-600' : 'text-red-600'
            }`}>
              {type === 'received' ? '+' : '-'}${donation.amount}
            </p>
          </div>
          {donation.message && (
            <p className="mt-2 text-sm text-gray-600 italic">"{donation.message}"</p>
          )}
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={14} />
            <span>Avui</span>
          </div>
        </div>
      </div>
    </div>
  );
}









//   return (
//     <div className={`rounded-lg shadow-md p-4 ${
//       type === 'received' ? 'bg-green-50' : 'bg-red-50'
//     }`}>
//       <div className="flex gap-4">
//         <img 
//           src={animal.image_url} 
//           alt={animal.name}
//           className="w-24 h-24 object-cover rounded-lg"
//         />
//         <div className="flex flex-col justify-between">
//           <div>
//             <h3 className="font-semibold text-lg">{animal.name}</h3>
//             <p className="text-sm text-gray-600">{donation.fullname}</p>
//           </div>
//           <p className={`font-bold ${
//             type === 'received' ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {type === 'received' ? '+' : '-'}${donation.amount}
//           </p>
//         </div>
//       </div>
//       {donation.message && (
//         <p className="mt-2 text-sm text-gray-600 italic">"{donation.message}"</p>
//       )}
//     </div>
//   );
// }