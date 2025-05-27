import React from 'react';
import type { CardType } from '../types';
import { useCardImage } from '../hooks';
import { DeleteCard } from '@/features/delete-card/ui/delete-card';

import cls from './card.module.scss';
import { cardDeleted } from '@/features/delete-card/model';

interface CardProps extends CardType {
  isDragging?: boolean;
  isLoading?: boolean;
  imageSrc?: string | null;
}

export const Card = React.memo(({
  id,
  imageUrl,
  description,
  isDragging = false,
}: CardProps) => {
  const { src, isLoading } = useCardImage(imageUrl);

  return (
    <div className={`${cls.card} ${isDragging ? cls.card_dragging : ''}`}>
      {<DeleteCard onClick={() => cardDeleted(id)} />}
      <div className={cls.card__image}>
        {isLoading && <div className={cls.card__loader} />}
        {src && (
          <img 
            src={src}
            alt={description}
            loading="lazy"
            className={`${cls.card__img} ${isLoading ? cls.card__img_hidden : ''}`}
          />
        )}
      </div>
    </div>
  );
});

Card.displayName = 'Card';