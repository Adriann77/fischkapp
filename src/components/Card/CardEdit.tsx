import React from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Trash } from '../icons/Trash';

interface Props {
	editCard: () => void;
	inputValue: string;
	handleAnswerInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	answerInputValue: string;
	cancelChanges: () => void;
	showError: boolean;
	submitChanges: () => void;
}

export const CardEdit = ({
	editCard,
	inputValue,
	handleAnswerInputChange,
	answerInputValue,
	cancelChanges,
	submitChanges,
	showError,
}: Props) => {
	return (
		<div className={styles.rectangle}>
			<button
				onClick={editCard}
				className={styles.buttonTrash}>
				<Trash />
			</button>
			<p className={styles.headingTitle}>{inputValue}</p>
			<input
				onChange={handleAnswerInputChange}
				type='text'
				value={answerInputValue}
			/>
			{showError && <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>}
			<div className={styles.buttons}>
				<button
					onClick={cancelChanges}
					className={styles.buttonCardOne}>
					Cancel
				</button>
				<button
					onClick={submitChanges}
					className={styles.buttonCardSecond}>
					Save
				</button>
			</div>
		</div>
	);
};
