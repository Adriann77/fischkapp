import React, { useEffect, useRef } from 'react';
import styles from '../CssModule/NewCard.module.scss';

interface Props {
	inputValue: string;
	handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	showError: boolean;
	reset: () => void;
	checkInput: () => void;
}

export const NewCardFirstStep = ({ inputValue, handleInputChange, showError, reset, checkInput }: Props) => {
	const answerInputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (answerInputRef.current) {
			answerInputRef.current.style.height = 'auto';
			answerInputRef.current.style.height = `${answerInputRef.current.scrollHeight}px`;
			answerInputRef.current.selectionStart = inputValue.length;
			answerInputRef.current.selectionEnd = inputValue.length;
			answerInputRef.current.focus();
		}
	}, [answerInputRef]);

	return (
		<div className={styles.rectangle}>
			<div className={styles.formContainerSingle}>
				<textarea
					data-testid='front-textarea-first-step'
					name='FrontCard'
					rows={1}
					value={inputValue}
					onChange={handleInputChange}
					ref={answerInputRef}
				/>
			</div>
			{showError && <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>}
			<div className={styles.buttons}>
				<button
					onClick={reset}
					className={styles.buttonCardOne}>
					Cancel
				</button>
				<button
					data-testid='SaveBtn'
					onClick={checkInput}
					className={styles.buttonCardSecond}>
					Next
				</button>
			</div>
		</div>
	);
};
