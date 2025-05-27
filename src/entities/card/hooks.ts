import { useState, useEffect } from 'react';
import { FALLBACK_IMAGE } from '@/entities/card/model';

const imageCache = new Map<string, string>();

export const useCardImage = (imageUrl?: string) => {
  const [state, setState] = useState(() => ({
    src: null as string | null,
    isLoading: true
  }));

  useEffect(() => {
    if (!imageUrl) {
      setState({ src: FALLBACK_IMAGE, isLoading: false });
      return;
    }

    if (imageCache.has(imageUrl)) {
      setState({ src: imageCache.get(imageUrl)!, isLoading: false });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      imageCache.set(imageUrl, imageUrl);
      setState({ src: imageUrl, isLoading: false });
    };
    
    img.onerror = () => {
      imageCache.set(imageUrl, FALLBACK_IMAGE);
      setState({ src: FALLBACK_IMAGE, isLoading: false });
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return state;
};