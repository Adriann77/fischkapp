import { Key } from "react";
import { Card } from "./Card/Card";
import React from "react";

interface Card {

  back: string;
  front: string;
  id: string;
}

interface Props {
  card: Card[];
  updateCards: (newHeader: string, newAnswer: string, cardId: string) => void;
  removeCard: (cardId: string) => void;
}

export const CardsList = ({ card, updateCards, removeCard }: Props) => {
  const update = (newHeading: string, newAnswer: string, cardId: string) => {
    updateCards(newHeading, newAnswer, cardId);
  };

  const cardsElement = card.map((c: Card) => {
    return (
      <Card
        removeCard={(cardId: string) => {
          removeCard(cardId);
        }}
        update={update}
        cardId={c.id}
        key={c.id}
        front={c.front}
        back={c.back}
      />
    );
  });

  return <>{cardsElement}</>;
};
