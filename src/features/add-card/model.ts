import { $cards } from "@/entities/card/model";
import { v4 as uuidv4 } from 'uuid';
import { createEffect, createEvent, sample } from "effector";
import { fetchCatImage } from "./api";

export const cardAdded = createEvent();

export const fetchCatImageFx = createEffect<void, string, Error>(async () => {
  return await fetchCatImage();
});

sample({
  clock: cardAdded,
  target: fetchCatImageFx
});

sample({
  clock: fetchCatImageFx.doneData,
  source: $cards,
  fn: (cards, imageUrl) => [
    ...cards,
    {
      id: uuidv4(),
      description: 'Новая карточка',
      imageUrl: imageUrl,
    }
  ],
  target: $cards
});