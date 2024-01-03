import React from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Trash } from '../icons/Trash';

interface Props {
	inputValue: string;
	textInputValue: string;
	handleTextInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
			<p className={styles.headingTitle}>{inputValue}</p>
			<input
				value={textInputValue}
				onChange={handleTextInputChange}
				type='text'
			/>
			{showError && <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>}
			<div className={styles.buttons}>
				<button
					onClick={backToFirstStep}
					className={styles.buttonCardOne}>
					Back
				</button>
				<button
					onClick={checkTextInput}
					className={styles.buttonCardSecond}>
					Save
				</button>
			</div>
			<button
				onClick={reset}
				className={styles.buttonTrash}>
				<Trash />
			</button>
		</div>
	);
};
