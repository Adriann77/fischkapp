import React from "react";
import styles from "../CssModule/NewCard.module.scss";
import { Trash } from "../../../icons/Trash";

interface Props {
  editCard: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputValue: string;
  cancelChanges: () => void;
  submitChanges: () => void;
  showError: boolean;
  deleteCard: () => void;
}

export const FlippedCardEdit = ({
  editCard,
  handleInputChange,
  inputValue,
  cancelChanges,
  submitChanges,
  showError,
  deleteCard,
}: Props) => {
  return (
    <div className={styles.rectangle}>
      <button onClick={deleteCard} className={styles.buttonTrash}>
        <Trash />
      </button>
      <div className={styles.formContainerSingle}>
        <textarea onChange={handleInputChange} value={inputValue} />
      </div>
      {showError && (
        <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>
      )}
      <div className={styles.buttons}>
        <button onClick={cancelChanges} className={styles.buttonCardOne}>
          Cancel
        </button>
        <button onClick={submitChanges} className={styles.buttonCardSecond}>
          Save
        </button>
      </div>
    </div>
  );
};
