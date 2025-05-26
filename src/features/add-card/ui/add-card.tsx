import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cls from './add-card.module.scss';
import { cardAdded } from '../models';
import type { CardType } from '@/entities/card/types';

export const AddCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const imageUrl = data[0]?.url || '';

      const newCard: CardType = {
        id: uuidv4(),
        description: 'Новая карточка',
        imageUrl,
      };

      cardAdded(newCard);

    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);

      const newCard: CardType = {
        id: uuidv4(),
        description: 'Новая карточка',
        imageUrl: '',
      };

      cardAdded(newCard);
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <button
      className={`${cls['add-button']} ${isLoading ? cls.loading : ''}`}
      onClick={handleAdd}
      disabled={isLoading}
    >
      <span className={cls.cat}>
        {isLoading ? '😻' : '🐱'}
      </span>
    </button>
  );
};