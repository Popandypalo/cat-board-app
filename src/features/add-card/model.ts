import { $cards } from "@/entities/card/model";
import type { CardType } from "@/entities/card/types";
import { createEvent, sample } from "effector";

export const cardAdded = createEvent<CardType>();

sample({
  source: $cards,
  clock: cardAdded,
  fn: (cards, newCard) => {
    return [...cards, newCard];
  },
  target: $cards
});
