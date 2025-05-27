import { CatImagesSchema } from "./schemas";

export const fetchCatImage = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const parsed = CatImagesSchema.parse(data);
    
    if (parsed.length === 0) {
      throw new Error('No images found');
    }
    
    return parsed[0].url;

  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};