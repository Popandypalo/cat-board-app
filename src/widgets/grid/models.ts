import { $activeDndItemId } from "@/entities/card/models";
import { createEvent, sample } from "effector";

export const dragEnded = createEvent();
export const dragStarted = createEvent<string>();

sample({
  clock: dragStarted,
  target: $activeDndItemId,
  fn: (id) => id
});

sample({
  source: dragEnded,
  target: $activeDndItemId,
  fn: () => null
});