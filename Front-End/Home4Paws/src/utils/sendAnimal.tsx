import axios from 'axios';
import { AnimalFormData } from '../classes/FormAdoption';

const API_URL = 'http://localhost:8080/home4paws/animals';

export const submitAnimalForm = async (formData: AnimalFormData) => {
  try {
    const data = new FormData();
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'imageFile' && value !== undefined) {
        data.append(key, value);
      }
    });

    // Append the image file if it exists
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }

    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};