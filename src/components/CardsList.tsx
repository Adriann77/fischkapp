import { Key } from 'react';
import { Cards } from './Cards';
import React, { useState } from 'react';

interface Card {
	id: number;
	heading: string;
	answer: string;
}

interface Props {
	cards: Card[];
}

export const CardsList = ({ cards }: Props) => {
	const cardsElement = cards.map((c: Card) => {
		return (
			<Cards
				key={c.id}
				heading={c.heading}
				answer={c.answer}
			/>
		);
	});

	return <>{cardsElement}</>;
};
