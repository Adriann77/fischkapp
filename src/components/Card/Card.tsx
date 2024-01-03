import React, { useState } from "react";
import { CardFront } from "./CardFront";
import { FlippedCardEdit } from "./FlippedCardEdit";
import { CardEdit } from "./CardEdit";

interface Props {
  heading: string;
  answer: string;
  cardId: number;
  update: (heading: string, answer: string, cardId: number) => void;
  removeCard: (cardId: number) => void;
}

export const Card = ({
  heading,
  answer,
  update,
  cardId,
  removeCard,
}: Props) => {
  const [isEditCard, setIsEditCard] = useState(false);
  const [inputValue, setInputValue] = useState(heading);
  const [answerInputValue, setAnswerInputValue] = useState(answer);

  const [flipCard, setFlipCard] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAnswerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
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
    setInputValue(heading);
    setAnswerInputValue(answer);
    setIsEditCard(false);
    setShowError(false);
  };

  return (
    <>
      {!isEditCard && (
        <CardFront
          flipCard={flipCard}
          editCard={editCard}
          answerInputValue={answer}
          inputValue={heading}
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
              inputValue={heading}
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
