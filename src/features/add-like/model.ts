import { createEvent, sample } from "effector";

import { $cards } from "@/entities/card/model";

export const cardLiked = createEvent< {id : string} >();

sample ({
    clock: cardLiked,
    source: $cards,
    fn: (cards, {id}) => cards.map(card =>
        card.id === id ? {...card, isLiked: !card.isLiked} : card
    ),
    target: $cards
})