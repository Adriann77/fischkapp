import React, { useEffect, useRef } from "react";
import styles from "../CssModule/NewCard.module.scss";
import { Trash } from "../../../icons/Trash";

interface Props {
  editCard: () => void;
  inputValue: string;
  handleAnswerInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  answerInputValue: string;
  cancelChanges: () => void;
  showError: boolean;
  submitChanges: () => void;
  deleteCard: () => void;
}

export const CardEdit = ({
  inputValue,
  handleAnswerInputChange,
  answerInputValue,
  cancelChanges,
  submitChanges,
  showError,
  deleteCard,
}: Props) => {
  const answerInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (answerInputRef.current) {
      answerInputRef.current.style.height = "auto";
      answerInputRef.current.style.height = `${answerInputRef.current.scrollHeight}px`;
    }
  }, [answerInputValue]);

  return (
		<div className={styles.rectangle}>
			<button
				data-testid='Delete'
				className={styles.buttonTrash}
				onClick={deleteCard}>
				<Trash />
			</button>
			<div className={styles.formContainerDouble}>
				<p
					data-testid='Front'
					className={styles.headingTitle}>
					{inputValue}
				</p>
				<textarea
					rows={1}
					onChange={handleAnswerInputChange}
					value={answerInputValue}
					ref={answerInputRef}
				/>
			</div>
			{showError && <p className={styles.errorParaph}>you can't save without content</p>}
			<div className={styles.buttons}>
				<button
					onClick={cancelChanges}
					className={styles.buttonCardOne}>
					Cancel
				</button>
				<button
					disabled={answerInputValue === '' ? true : false}
					style={{
						cursor: answerInputValue === '' ? 'not-allowed' : 'pointer',
						backgroundColor: answerInputValue === '' ? 'gray' : 'black',
					}}
					onClick={submitChanges}
					className={styles.buttonCardSecond}>
					Save
				</button>
			</div>
		</div>
	);
};
