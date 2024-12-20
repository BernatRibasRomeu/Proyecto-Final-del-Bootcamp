import type { Animal, Donation, Petition } from '../classes/Types';

export const mockAnimals: Record<number, Animal> = {
  1: {
    id: 1,
    name: "Luna",
    animal: "Dog",
    age: "Young",
    sex: "Female",
    image_url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    race: "Golden Retriever",
    protectora: "Happy Paws",
    place: "Barcelona",
    urgency: 3,
    description: "Friendly and energetic golden retriever",
    preferences: "Good with children",
    needs: "Regular exercise"
  },
  2: {
    id: 2,
    name: "Milo",
    animal: "Cat",
    age: "Adult",
    sex: "Male",
    image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    race: "Siamese",
    protectora: "Cat Haven",
    place: "Madrid",
    urgency: 4,
    description: "Gentle and affectionate Siamese cat",
    preferences: "Quiet home",
    needs: "Indoor only"
  },
  3: {
    id: 3,
    name: "Max",
    animal: "Dog",
    age: "Senior",
    sex: "Male",
    image_url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
    race: "Labrador",
    protectora: "Senior Paws",
    place: "Valencia",
    urgency: 5,
    description: "Sweet senior lab looking for a forever home",
    preferences: "Calm environment",
    needs: "Special diet"
  }
};

export const mockReceivedDonations: Donation[] = [
  {
    id: 1,
    amount: 50,
    fullname: "Maria Garcia",
    email: "maria@example.com",
    message: "For Luna's medical care ❤️",
    user_id: 1,
    animal_id: 1
  },
  {
    id: 2,
    amount: 75,
    fullname: "Carlos Rodriguez",
    email: "carlos@example.com",
    message: "To help with Milo's food",
    user_id: 1,
    animal_id: 2
  },{
    id: 3,
    amount: 50,
    fullname: "Maria Garcia",
    email: "maria@example.com",
    message: "For Luna's medical care ❤️",
    user_id: 1,
    animal_id: 1
  },
  {
    id: 4,
    amount: 75,
    fullname: "Carlos Rodriguez",
    email: "carlos@example.com",
    message: "To help with Milo's food",
    user_id: 1,
    animal_id: 2
  },{
    id: 5,
    amount: 50,
    fullname: "Maria Garcia",
    email: "maria@example.com",
    message: "For Luna's medical care ❤️",
    user_id: 1,
    animal_id: 1
  },
  {
    id: 6,
    amount: 75,
    fullname: "Carlos Rodriguez",
    email: "carlos@example.com",
    message: "To help with Milo's food",
    user_id: 1,
    animal_id: 2
  }
];

export const mockSentDonations: Donation[] = [
  {
    id: 7,
    amount: 30,
    fullname: "Your Name",
    email: "you@example.com",
    message: "Supporting Max's treatment",
    user_id: 1,
    animal_id: 3
  }
];

export const mockPetitions: Petition[] = [
  {
    id: 1,
    nombre: "Ana",
    apellidos: "Martinez Ruiz",
    email: "ana.martinez@example.com",
    telephone: 123456789,
    place: "Barcelona",
    message: "I would love to give Luna a forever home. I have a big garden and work from home.",
    user_id: 1,
    animal_id: 1,
    status: "pending"
  },
  {
    id: 2,
    nombre: "Pablo",
    apellidos: "Sanchez Lopez",
    email: "pablo.sanchez@example.com",
    telephone: 987654321,
    place: "Madrid",
    message: "I'm very interested in adopting Milo. I have experience with Siamese cats.",
    user_id: 1,
    animal_id: 2,
    status: "pending"
  },{
    id: 3,
    nombre: "Ana",
    apellidos: "Martinez Ruiz",
    email: "ana.martinez@example.com",
    telephone: 123456789,
    place: "Barcelona",
    message: "I would love to give Luna a forever home. I have a big garden and work from home.",
    user_id: 1,
    animal_id: 1,
    status: "pending"
  },
  {
    id: 4,
    nombre: "Pablo",
    apellidos: "Sanchez Lopez",
    email: "pablo.sanchez@example.com",
    telephone: 987654321,
    place: "Madrid",
    message: "I'm very interested in adopting Milo. I have experience with Siamese cats.",
    user_id: 1,
    animal_id: 2,
    status: "pending"
  },{
    id: 5,
    nombre: "Ana",
    apellidos: "Martinez Ruiz",
    email: "ana.martinez@example.com",
    telephone: 123456789,
    place: "Barcelona",
    message: "I would love to give Luna a forever home. I have a big garden and work from home.",
    user_id: 1,
    animal_id: 1,
    status: "pending"
  },
  {
    id: 6,
    nombre: "Pablo",
    apellidos: "Sanchez Lopez",
    email: "pablo.sanchez@example.com",
    telephone: 987654321,
    place: "Madrid",
    message: "I'm very interested in adopting Milo. I have experience with Siamese cats.",
    user_id: 1,
    animal_id: 2,
    status: "pending"
  }
];