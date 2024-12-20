import imageCompression from 'browser-image-compression';

export const MAX_FILE_SIZE_MB = 1; // 1MB limit
export const MAX_WIDTH_PX = 800;
export const MAX_HEIGHT_PX = 400;

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: Math.max(MAX_WIDTH_PX, MAX_HEIGHT_PX),
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
};

export const validateImage = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (!validTypes.includes(file.type)) {
    return 'Please upload a valid image file (JPG, PNG, or GIF)';
  }

  const fileSizeInMB = file.size / (1024 * 1024);
  if (fileSizeInMB > MAX_FILE_SIZE_MB) {
    return `Image size must be less than ${MAX_FILE_SIZE_MB}MB`;
  }

  return null;
};