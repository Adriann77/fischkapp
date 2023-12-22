import React from 'react';
import styles from './CssModule/NewCard.module.css';
import { Trash } from './icons/Trash';

interface Props {
	heading: any;
	answer: any;
}

export const Cards = ({ heading, answer }: Props) => {
	return (
		<>
			<div className={styles.rectangle}>
				<button className={styles.buttonTrash}>
					<Trash />
				</button>
				<p>{heading}</p>
				<p>{answer}</p>
			</div>
		</>
	);
};
