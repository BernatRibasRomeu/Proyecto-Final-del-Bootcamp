export interface Donation {
    id: number;
    amount: number;
    fullname: string;
    email: string;
    message: string;
    user_id: number;
    animal_id: number;
  }
  
  export interface Animal {
    id: number;
    name: string;
    animal: string;
    age: string;
    sex: string;
    image_url: string;
    race: string;
    protectora: string;
    place: string;
    urgency: number;
    description: string;
    preferences: string;
    needs: string;
  }
  
  export interface Petition {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telephone: number;
    place: string;
    message: string;
    user_id: number;
    animal_id: number;
    status: string;
  }