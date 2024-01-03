import { Key } from "react";
import { Card } from "./Card/Card";
import React from "react";

interface Card {
  id: number;
  heading: string;
  answer: string;
}

interface Props {
  card: Card[];
  updateCards: (newHeader: string, newAnswer: string, cardId: number) => void;
  removeCard: (cardId: number) => void;
}

export const CardsList = ({ card, updateCards, removeCard }: Props) => {
  const update = (newHeading: string, newAnswer: string, cardId: number) => {
    updateCards(newHeading, newAnswer, cardId);
  };

  const cardsElement = card.map((c: Card) => {
    return (
      <Card
        removeCard={(cardId: number) => {
          removeCard(cardId);
        }}
        update={update}
        cardId={c.id}
        key={c.id}
        heading={c.heading}
        answer={c.answer}
      />
    );
  });

  return <>{cardsElement}</>;
};
