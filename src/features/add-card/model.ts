import { $cards } from "@/entities/card/model";
import { v4 as uuidv4 } from 'uuid';
import { createEffect, createEvent, sample } from "effector";
import { fetchCatImage } from "./api";
import type { CatImages } from "./schemas";
import type { CardType } from "@/entities/card/types";

export const cardAdded = createEvent();

export const fetchCatImageFx = createEffect<void, CatImages, Error>(async () => {
  return await fetchCatImage();
});

sample({
  clock: cardAdded,
  target: fetchCatImageFx
});

sample({
  clock: fetchCatImageFx.doneData,
  source: $cards,
  fn: (cards, data) => {
    console.log(cards.map(card => card.id));
    return [
    ...cards,
    ...data.map(
      card => ({
        id: uuidv4(),
        description: 'Новая 1карточка',
        imageUrl: card.url,
        breeds: card.breeds,
        isLiked: false
      } as CardType)
    )
  ] as CardType[]},
  target: $cards
});