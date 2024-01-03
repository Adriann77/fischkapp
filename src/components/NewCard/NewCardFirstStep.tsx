import React from 'react';
import styles from '../CssModule/NewCard.module.scss';

interface Props {
	inputValue: string;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	showError: boolean;
	reset: () => void;
	checkInput: () => void;
}

export const NewCardFirstStep = ({ inputValue, handleInputChange, showError, reset, checkInput }: Props) => {
	return (
		<div className={styles.rectangle}>
			<input
				value={inputValue}
				onChange={handleInputChange}
				type='text'
			/>
			{showError && <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>}
			<div className={styles.buttons}>
				<button
					onClick={reset}
					className={styles.buttonCardOne}>
					Cancel
				</button>
				<button
					onClick={checkInput}
					className={styles.buttonCardSecond}>
					Next
				</button>
			</div>
		</div>
	);
};
