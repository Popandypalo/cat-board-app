import { createStore } from "effector";
import type { CardType } from "./types";

export const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23f5f5f5"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="30">🐱</text></svg>';

export const $cards = createStore<CardType[]>([]);

export const $activeDndItemId = createStore<string | null>(null);


