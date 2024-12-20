import { Check, X, MapPin, Phone, Mail } from 'lucide-react';
import type { Petition,Animal } from '../../classes/Types';
import { useState, useEffect } from 'react';

interface PetitionCardProps {
  petition: Petition;
  onRespond: (petitionId: number, accepted: boolean) => void;
}

export default function PetitionCard({ petition, onRespond }: PetitionCardProps) {
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/home4paws/animals/${petition.animal_id}`)
      .then(res => res.json())
      .then(data => setAnimal(data))
      .catch(err => console.error('Error fetching animal:', err));
  }, [petition.animal_id]);

  if (!animal) return null;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex gap-4">
        <img 
          src={animal.image_url} 
          alt={animal.name}
          className="w-32 h-32 object-cover rounded-lg shadow-sm"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{animal.name}</h3>
              <p className="text-sm font-medium text-gray-700">{petition.nombre} {petition.apellidos}</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              {animal.animal}
            </span>
          </div>
          
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{petition.place}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} />
              <span>{petition.telephone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} />
              <span>{petition.email}</span>
            </div>
          </div>
          
          {petition.message && (
            <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg italic">
              "{petition.message}"
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onRespond(petition.id, false)}
          className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <X size={18} />
          Declinar
        </button>
        <button
          onClick={() => onRespond(petition.id, true)}
          className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Check size={18} />
          Acceptar
        </button>
      </div>
    </div>
  );
}







//   return (
//     <div className="bg-white rounded-lg shadow-md p-4">
//       <div className="flex gap-4">
//         <img 
//           src={animal.image_url} 
//           alt={animal.name}
//           className="w-32 h-32 object-cover rounded-lg"
//         />
//         <div className="flex-1">
//           <h3 className="font-semibold text-lg">{animal.name}</h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm"><span className="font-medium">From:</span> {petition.nombre} {petition.apellidos}</p>
//             <p className="text-sm"><span className="font-medium">Email:</span> {petition.email}</p>
//             <p className="text-sm"><span className="font-medium">Location:</span> {petition.place}</p>
//             {petition.message && (
//               <p className="text-sm mt-2 italic">"{petition.message}"</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           onClick={() => onRespond(petition.id, false)}
//           className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//         >
//           <X size={18} />
//           Decline
//         </button>
//         <button
//           onClick={() => onRespond(petition.id, true)}
//           className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//         >
//           <Check size={18} />
//           Accept
//         </button>
//       </div>
//     </div>
//   );
// }