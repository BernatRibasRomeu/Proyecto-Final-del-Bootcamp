export interface FormData {
    name: string;
    animal: string;
    age: string;
    sex: string;
    race: string;
    protectora: string;
    place: string;
    urgency: string;
    description: string;
    preferences: string;
    needs: string;
  }
  
  export interface ImageUploadProps {
    imagePreview: string | null;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onImageDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
    onRemoveImage: () => void;
  }
  
  export interface AnimalFormData extends FormData {
    imageFile?: File;
  }