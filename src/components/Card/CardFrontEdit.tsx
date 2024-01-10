import React, { useEffect, useRef } from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Trash } from '../../../icons/Trash';

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
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = 'auto';
			inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
		}
	}, [inputValue]);

	return (
		<div className={styles.rectangle}>
			<button
				onClick={deleteCard}
				className={styles.buttonTrash}>
				<Trash />
			</button>
			<div className={styles.formContainerSingle}>
				<textarea
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
					onClick={submitChanges}
					className={styles.buttonCardSecond}>
					Save
				</button>
			</div>
		</div>
	);
};
