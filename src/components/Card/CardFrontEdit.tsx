import React, { useEffect, useRef, useState } from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Trash } from '../../../icons/Trash';

interface Props {
	handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	inputValue: string;
	cancelChanges: () => void;
	submitChanges: () => void;
	showError: boolean;
	deleteCard: () => void;
}

export const FlippedCardEdit = ({
	handleInputChange,
	inputValue,
	cancelChanges,
	submitChanges,
	showError,
	deleteCard,
}: Props) => {
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = 'auto';
			inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
			inputRef.current.selectionStart = inputValue.length;
			inputRef.current.selectionEnd = inputValue.length;
			inputRef.current.focus();
		}
	}, [inputValue]);

	return (
		<div className={styles.rectangle}>
			<button
				data-testid='Delete'
				onClick={deleteCard}
				className={styles.buttonTrash}>
				<Trash />
			</button>
			<div className={styles.formContainerSingle}>
				<textarea
					data-testid='Front'
					rows={1}
					onChange={handleInputChange}
					value={inputValue}
					ref={inputRef}
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
					disabled={inputValue === '' ? true : false}
					onClick={submitChanges}
					style={{
						cursor: inputValue === '' ? 'not-allowed' : 'pointer',
						backgroundColor: inputValue === '' ? 'gray' : 'black',
					}}
					className={styles.buttonCardSecond}>
					Save
				</button>
			</div>
		</div>
	);
};
