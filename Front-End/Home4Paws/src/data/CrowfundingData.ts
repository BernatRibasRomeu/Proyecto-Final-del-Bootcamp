
import perroImagen from '../assets/perro-1.jpg';
import perro2 from '../assets/perro-2.jpg';
import perro3 from '../assets/perro-3.jpg';
import gatoImagen from '../assets/gato-1.jpg';
import type { CrowdfundingCampaign } from '../classes/Crowdfunding';

      export const crowdfundingCampaigns: CrowdfundingCampaign[] = [
      {
        images: [perro2], // Array de imágenes
        type: 'Usuari',
        name: 'Juan Pérez',
        campaignTitle: 'Campanya per la protecció dels animals',
        description: 'Ajuda en Joan a recaptar fons per protegir els animals al seu refugi.',
        raised: 1200,
        target: 5000,
        remainingTime: '15 dies restants',
      },
      {
        images: [perroImagen],
        type: 'Protectora',
        name: 'Protectora Animales Los Amigos',
        campaignTitle: 'Campanya per la adopccio de gossos',
        description: 'Ayuda a la protectora a recaudar fons per adoptar gossos en situació de risk.',
        raised: 3500,
        target: 8000,
        remainingTime: '8 dies restants',
      },
      {
        images: [gatoImagen],
        type: 'Usuari',
        name: 'María López',
        campaignTitle: 'Campanya par cuidar gats',
        description: 'Amb la teva ajuda, la Maria podrà cuidar els gats abandonats al seu barri.',
        raised: 500,
        target: 2000,
        remainingTime: '30 dies restants',
      },
    ];
    