import React from 'react';
import type { CardType } from '../types';
import { useCardImage } from '../hooks';
import { DeleteCard } from '@/features/delete-card/ui/delete-card';

import cls from './card.module.scss';
import { cardDeleted } from '@/features/delete-card/model';
import AddLike from '@/features/add-like/ui/add-like';
import { cardLiked } from '@/features/add-like/model';

interface ICardProps extends CardType {
  isDragging?: boolean;
  isLoading?: boolean;
  isDeleting?: boolean;

  imageSrc?: string | null;

  attributes?: object;
  listeners?: object;
}

export const Card = React.memo(({
  id,
  imageUrl,
  description,
  isDragging = false,
  isDeleting = false,
  isLiked = false
}: ICardProps) => {
  const { src, isLoading } = useCardImage(imageUrl);

  return (
    <div className={`${cls['card']} ${isDragging ? cls['card_dragging'] : ''} ${isDeleting ? cls['card_deleting'] : ''}`}>
      {isLoading && <div className={cls['card__loader']} />}
      {<DeleteCard onClick={() => cardDeleted({id})} />}
      <div className={cls['card__image']}>
        {src && (
          <img 
            src={src}
            alt={description}
            loading="lazy"
            className={`${cls['card__img']} ${isLoading ? cls['card__img_hidden'] : ''}`}
          />
        )}
      </div>
      <div className={cls['card__content']}>
        <AddLike onClick={() => cardLiked({id})} isLiked={isLiked}/>
      </div>
    </div>
  );
});

Card.displayName = 'Card';