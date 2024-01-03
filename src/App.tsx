import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import './App.css';
import React, { useState } from 'react';
import { NewCard } from './components/NewCard/NewCard';
import { CardsList } from './components/CardsList';

const initialCards = [
	{ heading: 'tytul', answer: 'costamn', id: 1 },
	{ heading: 'lutyt', answer: 'nmatsoc', id: 2 },
];

function App() {
	const [newCard, setNewCard] = useState(false);
	const [val, setVal] = useState(0);
	const [cards, setCards] = useState(initialCards);

	function createNewCard() {
		{
			setNewCard(true);
		}
	}

	function resetHandler() {
		setNewCard(false);
	}

	function updateCards(newHeader: string, newAnswer: string, cardId: number) {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card.id === cardId) {
					return { ...card, heading: newHeader, answer: newAnswer };
				}
				return card;
			}),
		);
	}

	return (
		<>
			<AppLayout>
				<AppHeader
					createNewCard={createNewCard}
					num={val === 0 ? initialCards.length : val}
				/>

				{newCard && (
					<NewCard
						onSaveClick={(heading, answer) => {
							setCards(prevCards => {
								return [{ heading, answer, id: cards.length + 1 }, ...prevCards];
							});
							setVal(cards.length + 1);
						}}
						checker={newCard}
						reset={resetHandler}
					/>
				)}

				<CardsList
					card={cards}
					updateCards={updateCards}
				/>
			</AppLayout>
		</>
	);
}

export default App;
