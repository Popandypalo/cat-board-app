import { $cards } from "@/entities/card/model";
import { v4 as uuidv4 } from 'uuid';
import { createEffect, createEvent, sample } from "effector";
import { fetchCatImage } from "./api";

export const cardAdded = createEvent();

// Properly typed effect
export const fetchCatImageFx = createEffect<void, string, Error>(async () => {
  return await fetchCatImage();
});

// Trigger image fetch when card is added
sample({
  clock: cardAdded,
  target: fetchCatImageFx
});

// Add new card when image is successfully fetched
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