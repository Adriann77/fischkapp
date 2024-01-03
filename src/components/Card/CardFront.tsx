import React, { Dispatch, SetStateAction } from 'react';
import styles from '../CssModule/NewCard.module.scss';
import { Pencil } from '../icons/Pencil';

interface Props {
	flipCard: boolean;
	editCard: () => void;
	answerInputValue: string;
	inputValue: string;
	setFlipCard: Dispatch<SetStateAction<boolean>>;
}

export const CardFront = ({ flipCard, editCard, answerInputValue, inputValue, setFlipCard }: Props) => {
	return (
		<div
			onClick={() => {
				setFlipCard(!flipCard);
			}}
			className={`${styles.rectangle} ${flipCard ? styles.back : styles.front}`}>
			<button
				onClick={editCard}
				className={styles.buttonTrash}>
				<Pencil />
			</button>
			<div className={styles.text}>
				<p className={styles.heading}>{inputValue}</p>
				<p className={styles.answer}>{answerInputValue}</p>
			</div>
		</div>
	);
};
