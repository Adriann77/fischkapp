import React from 'react';
import styles from './CssModule/NewCard.module.scss';
import { useState } from 'react';
import { Trash } from './icons/Trash';

interface Props {
	checker: boolean;
	reset: any;
	onSaveClick: any;
}

export const NewCard = ({ checker, reset, onSaveClick }: Props) => {
	const [inputValue, setInputValue] = useState('');
	const [textInputValue, setTextInputValue] = useState('');
	const [secondStep, setSecondStep] = useState(false);
	const [showError, setShowError] = useState(false);
	const [firstStep, setFirstStep] = useState(checker);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue(event.target.value);
	};

	const backToFirstStep = () => {
		setFirstStep(true);
		setSecondStep(false);
		setShowError(false);
	};
	const checkInput = () => {
		if (inputValue.length === 0) {
			setShowError(true);
		} else {
			setShowError(false);
			setFirstStep(false);
			setSecondStep(true);
		}
	};

	const checkTextInput = () => {
		if (textInputValue.length === 0) {
			setShowError(true);
		} else {
			setShowError(false);
			setFirstStep(false);
			setSecondStep(false);
			reset();

			const heading = inputValue;
			const answer = textInputValue;

			onSaveClick(heading, answer);
		}
	};

	return (
		<>
			{firstStep && (
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
			)}
			{secondStep && (
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
			)}
		</>
	);
};
