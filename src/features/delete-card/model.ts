import { createEvent, sample } from 'effector';
import { $cards } from '@/entities/card/model';

export const cardDeleted = createEvent<{ id : string }>();

sample({
  clock: cardDeleted,
  source: $cards,
  fn: (cards, {id}) => cards.filter(card => card.id !== id),
  target: $cards
});