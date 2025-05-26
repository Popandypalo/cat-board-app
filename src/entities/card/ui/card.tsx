import { useState, useEffect, useRef } from 'react';
import { DeleteCard } from '@/features/delete-card/ui/delete-card';
import { cardDeleted } from '@/features/delete-card/model';
import type { CardType } from '@/entities/card/types';
import { FALLBACK_IMAGE } from '../model';

import cls from './card.module.scss';

interface CardProps extends CardType {
  isDragging?: boolean;
}

export const Card = ({ id, imageUrl, description, isDragging }: CardProps) => {
  const [imageState, setImageState] = useState<{
    src: string | null;
    isLoading: boolean;
  }>({ src: null, isLoading: true });

  const loadedImages = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!imageUrl) {
      setImageState({ src: FALLBACK_IMAGE, isLoading: false });
      return;
    }

    if (loadedImages.current.has(imageUrl)) {
      setImageState({ src: imageUrl, isLoading: false });
      return;
    }

    setImageState(prev => ({ ...prev, isLoading: true }));

    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      loadedImages.current.add(imageUrl);
      setImageState({ src: imageUrl, isLoading: false });
    };
    
    img.onerror = () => {
      loadedImages.current.add(imageUrl);
      setImageState({ src: FALLBACK_IMAGE, isLoading: false });
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className={`${cls.card} ${isDragging ? cls.card_dragging : ''}`}>
      <DeleteCard onClick={() => cardDeleted(id)} />
      
      <div className={cls.card__image}>
        {imageState.isLoading && <div className={cls.card__loader} />}
        {imageState.src && (
          <img 
            src={imageState.src}
            alt={description}
            className={`${cls.card__img} ${
              imageState.isLoading ? cls.card__img_hidden : ''
            }`}
          />
        )}
      </div>
    </div>
  );
};