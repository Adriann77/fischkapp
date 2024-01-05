import React from "react";
import styles from "../CssModule/NewCard.module.scss";
import { Trash } from "../../../icons/Trash";

interface Props {
  inputValue: string;
  textInputValue: string;
  handleTextInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  showError: boolean;
  backToFirstStep: () => void;
  checkTextInput: () => void;
  reset: () => void;
}

export const NewCardSecondStep = ({
  inputValue,
  textInputValue,
  handleTextInputChange,
  showError,
  backToFirstStep,
  checkTextInput,
  reset,
}: Props) => {
  return (
    <div className={styles.rectangle}>
      <div className={styles.formContainerDouble}>
        <p className={styles.headingTitle}>{inputValue}</p>
        <textarea value={textInputValue} onChange={handleTextInputChange} />
      </div>
      {showError && (
        <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>
      )}
      <div className={styles.buttons}>
        <button onClick={backToFirstStep} className={styles.buttonCardOne}>
          Back
        </button>
        <button onClick={checkTextInput} className={styles.buttonCardSecond}>
          Save
        </button>
      </div>
      <button onClick={reset} className={styles.buttonTrash}>
        <Trash />
      </button>
    </div>
  );
};
