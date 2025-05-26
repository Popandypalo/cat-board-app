import { $cards } from "@/entities/card/models";
import type { CardType } from "@/entities/card/types";
import { createEvent, sample } from "effector";

export const cardUpdated = createEvent<CardType[]>();

sample ({
    source: $cards,
    clock: cardUpdated,
    fn: (cards) => [...cards],
    target: $cards
});