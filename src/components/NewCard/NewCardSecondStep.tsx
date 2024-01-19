import React, { useEffect, useRef } from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Trash } from '../../../icons/Trash';

interface Props {
	inputValue: string;
	textInputValue: string;
	handleTextInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
	const answerInputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (answerInputRef.current) {
			answerInputRef.current.style.height = 'auto';
			answerInputRef.current.style.height = `${answerInputRef.current.scrollHeight}px`;
      answerInputRef.current.focus();
       answerInputRef.current.selectionStart = textInputValue.length;
				answerInputRef.current.selectionEnd = textInputValue.length;
		}
	}, [answerInputRef]);

	return (
		<div className={styles.rectangle}>
			<div className={styles.formContainerDouble}>
				<p className={styles.headingTitle}>{inputValue}</p>
				<textarea
					data-testid='back-textarea-second-step'
					name='Back'
					rows={1}
					value={textInputValue}
					onChange={handleTextInputChange}
					ref={answerInputRef}
				/>
			</div>
			{showError && <p className={styles.errorParaph}>Wprowadź najpierw jakieś słowa.</p>}
			<div className={styles.buttons}>
				<button
					onClick={backToFirstStep}
					className={styles.buttonCardOne}>
					Back
				</button>
				<button
					data-testid='SaveBtn'
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
