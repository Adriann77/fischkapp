import styles from './CssModule/NewCard.module.scss';
import { Trash } from './icons/Trash';
import { Pencil } from './icons/Pencil';
import React, { useState } from 'react';

interface Props {
	heading: string;
	answer: string;
}

export const Cards = ({ heading, answer }: Props) => {
	const [isEditCard, setIsEditCard] = useState(false);
	const [inputValue, setInputValue] = useState(heading);
	const [answerInputValue, setAnswerInputValue] = useState(answer);
	const [prevInputValue, setPrevInputValue] = useState('');
	const [prevAnswerInputValue, setAnswerPrevInputValue] = useState('');
	const [flipCard, setFlipCard] = useState(false);
	const [showError, setShowError] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	const handleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAnswerInputValue(event.target.value);
	};

	const editCard = () => {
		setIsEditCard(true);
		setPrevInputValue(inputValue);
		setAnswerPrevInputValue(answerInputValue);
	};

	const submitChanges = () => {
		if (inputValue && answerInputValue != '') {
			setFlipCard(false);
			setIsEditCard(false);
			setShowError(false);
		} else {
			setShowError(true);
		}
	};
	const cancelChanges = () => {
		setFlipCard(false);
		setInputValue(prevInputValue);
		setAnswerInputValue(prevAnswerInputValue);
		setIsEditCard(false);
		setShowError(false);
	};

	return (
		<>
			{!isEditCard && (
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
			)}
			{isEditCard && (
				<>
					{flipCard ? (
						<div className={styles.rectangle}>
							<button
								onClick={editCard}
								className={styles.buttonTrash}>
								<Trash />
							</button>
							<input
								onChange={handleInputChange}
								type='text'
								value={inputValue}
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
					) : (
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
					)}
				</>
			)}
		</>
	);
};
