import { $cards } from "@/entities/card/model";
import { createEvent, sample } from "effector";

export const cardMoved = createEvent<{activeId: string; overId: string}>();

sample({
  clock: cardMoved,
  source: $cards,
  fn: (cards, { activeId, overId }) => {
    const fromIndex = cards.findIndex(c => c.id === activeId);
    const toIndex = cards.findIndex(c => c.id === overId);
    
    if (fromIndex === -1 || toIndex === -1) return cards;
    
    const newCards = [...cards];
    const [movedCard] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, movedCard);
    
    return newCards;
  },
  target: $cards
});