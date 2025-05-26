import { createEvent, sample } from 'effector';
import { $cards } from '@/entities/card/models';

export const cardDeleted = createEvent<string>();

sample({
  clock: cardDeleted,
  source: $cards,
  fn: (cards, id) => cards.filter(card => card.id !== id),
  target: $cards
});