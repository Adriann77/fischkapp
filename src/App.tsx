import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import './App.css';
import React, { useState } from 'react';
import { NewCard } from './components/NewCard';
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

	return (
		<>
			<AppLayout>
				<AppHeader
					createNewCard={createNewCard}
					num={val === 0 ? initialCards.length : val}
				/>

				{newCard && (
					<NewCard
						onSaveClick={(heading: any, answer: any) => {
							setCards(prevCards => {
								return [{ heading, answer, id: cards.length + 1 }, ...prevCards];
							});
							setVal(cards.length + 1);
						}}
						checker={newCard}
						reset={resetHandler}
					/>
				)}

				<CardsList cards={cards} />
			</AppLayout>
		</>
	);
}

export default App;
