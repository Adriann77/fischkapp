import React, { useState } from "react";
import { CardFront } from "./CardFront";
import { FlippedCardEdit } from "./CardFrontEdit";
import { CardEdit } from "./CardEdit";

interface Props {
  front: string;
  back: string;
  cardId: string;
  update: (heading: string, answer: string, cardId: string) => void;
  removeCard: (cardId: string) => void;
}

export const Card = ({ front, back, update, cardId, removeCard }: Props) => {
  const [isEditCard, setIsEditCard] = useState(false);
  const [inputValue, setInputValue] = useState(front);
  const [answerInputValue, setAnswerInputValue] = useState(back);

  const [flipCard, setFlipCard] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const handleAnswerInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAnswerInputValue(event.target.value);
  };

  const editCard = () => {
    setIsEditCard(true);
  };

  const submitChanges = () => {
    if (inputValue && answerInputValue != "") {
      setFlipCard(false);
      setIsEditCard(false);
      setShowError(false);
    } else {
      setShowError(true);
    }

    const newHeading = inputValue;
    const newAnswer = answerInputValue;

    update(newHeading, newAnswer, cardId);
  };
  const cancelChanges = () => {
    setFlipCard(false);
    setInputValue(front);
    setAnswerInputValue(back);
    setIsEditCard(false);
    setShowError(false);
  };

  return (
    <>
      {!isEditCard && (
        <CardFront
          flipCard={flipCard}
          editCard={editCard}
          answerInputValue={front}
          inputValue={back}
          setFlipCard={setFlipCard}
        />
      )}
      {isEditCard && (
        <>
          {flipCard ? (
            <FlippedCardEdit
              deleteCard={() => {
                removeCard(cardId);
              }}
              editCard={editCard}
              handleInputChange={handleInputChange}
              inputValue={inputValue}
              cancelChanges={cancelChanges}
              submitChanges={submitChanges}
              showError={showError}
            />
          ) : (
            <CardEdit
              deleteCard={() => {
                removeCard(cardId);
              }}
              editCard={editCard}
              handleAnswerInputChange={handleAnswerInputChange}
              inputValue={front}
              cancelChanges={cancelChanges}
              submitChanges={submitChanges}
              showError={showError}
              answerInputValue={answerInputValue}
            />
          )}
        </>
      )}
    </>
  );
};
