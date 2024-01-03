import { Key } from 'react';
import { Card } from './Card/Card';

interface Card {
	id: number;
	heading: string;
	answer: string;
}

interface Props {
	card: Card[];
	updateCards: (newHeader: string, newAnswer: string, cardId: number) => void;
}

export const CardsList = ({ card, updateCards }: Props) => {
	const update = (newHeading: string, newAnswer: string, cardId: number) => {
		updateCards(newHeading, newAnswer, cardId);
	};

	const cardsElement = card.map((c: Card) => {
		return (
			<Card
				update={update}
				cardId={c.id}
				key={c.id}
				heading={c.heading}
				answer={c.answer}
			/>
		);
	});

	return <>{cardsElement}</>;
};
