import React, { Dispatch, SetStateAction } from "react";
import styles from "../CssModule/NewCard.module.scss";
import { Pencil } from "../../../icons/Pencil";

interface Props {
  flipCard: boolean;
  editCard: () => void;
  answerInputValue: string;
  inputValue: string;
  setFlipCard: Dispatch<SetStateAction<boolean>>;
}

export const CardFront = ({
  flipCard,
  editCard,
  answerInputValue,
  inputValue,
  setFlipCard,
}: Props) => {
  return (
    <>
      {!flipCard ? (
        <div
          onClick={() => {
            setFlipCard(!flipCard);
          }}
          className={styles.cardFront}
        >
          <div className={`${styles.card} ${flipCard ? styles.flip : ""}`}>
            <button
              data-testid="Edit"
              onClick={editCard}
              className={styles.buttonTrash}
            >
              <Pencil />
            </button>
            <div className={styles.text}>
              <p
                data-testid="front"
                className={`${styles.heading} ${
                  flipCard ? styles.fade : styles.showText
                }`}
              >
                {inputValue}
              </p>
              <p
                data-testid="back"
                className={`${styles.answer} ${
                  flipCard ? styles.showText : styles.fade
                }`}
              >
                {answerInputValue}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            setFlipCard(!flipCard);
          }}
          className={styles.cardBack}
        >
          <div className={`${styles.card} ${flipCard ? styles.flipBack : ""}`}>
            <button
              onClick={editCard}
              data-testid="Edit"
              className={styles.buttonTrash}
            >
              <Pencil />
            </button>
            <div className={styles.text}>
              <p
                data-testid="front"
                className={`${styles.heading} ${
                  flipCard ? styles.showText : styles.fade
                }`}
              >
                {inputValue}
              </p>
              <p
                data-testid="back"
                className={`${styles.answer} ${
                  flipCard ? styles.showText : styles.fade
                }`}
              >
                {answerInputValue}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
