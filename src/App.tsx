import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import './App.css';
import React, { useState, useEffect } from 'react';
import { NewCard } from './components/NewCard/NewCard';
import { CardsList } from './components/CardsList';
import { v4 as uuidv4 } from 'uuid';

// const initialCards = [
// 	{
// 		front: 'pierwsze pytanie krotkie',
// 		back: 'Lorem ipsum dolor sit amet.',
// 		id: 1,
// 	},
// 	{
// 		front: 'drugie pytanie srednie srednie drugie pytanie',
// 		back:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, pariatur eveniet placeat nisi cumque porro deleniti aspernatur dolor culpa fugiat dignissimos nam tenetur, incidunt a commodi? Sed qui necessitatibus, placeat nisi cumque porro deleniti aspernatur dolor culpa fugiat dignissimo sit!unt a commodi? Sed qui necessitatibus, placeat nisi cumque porro deleniti aspernatur dolor culpa fugiat dignissimo sit!,ignissimo sit!unt a commodi? Sed qui necessitatibus, placeat nisi cumque porro deleniti aspernatur dolor culpa fugiat dignissimo sit!',
// 		id: 2,
// 	},
// 	{
// 		front: 'trzecie pytanie dlugie dlugie dlugie trzecie pytanie pytanie trzeczie',
// 		back: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, assumenda?',
// 		id: 3,
// 	},
// ];

const response: { front: string; back: string; _id: string }[] = [];

// Function to collect data

function App() {
	const [newCard, setNewCard] = useState(false);
	const [val, setVal] = useState(response.length);
	const [cards, setCards] = useState(response);
	const [isLoading, setIsLoading] = useState(true);

	const getApiData = async () => {
		const response = await fetch(' https://training.nerdbord.io/api/v1/fischkapp/flashcards')
			.then(response => response.json())
			.then(response => {
				const reversedData = response.reverse();
				setCards(reversedData);
				setVal(response.length);
				setIsLoading(false);
			});
	};
	useEffect(() => {
		getApiData();
	}, []);

	function createNewCard() {
		{
			setNewCard(true);
		}
	}

	function resetHandler() {
		setNewCard(false);
	}

	function onSaveClick(front, back) {
		setCards(prevCards => {
			return [{ front, back, _id: uuidv4() }, ...prevCards];
		});
		setVal(prevVal => prevVal + 1);

		const flashcardData = {
			front: front,
			back: back,
		};

		fetch('https://training.nerdbord.io/api/v1/fischkapp/flashcards', {
			method: 'POST',
			headers: {
				Authorization: 'secret_token',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(flashcardData),
		}).then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		});
	}

	function updateCards(newFront: string, newBack: string, cardId: string) {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card._id === cardId) {
					return { ...card, front: newFront, back: newBack };
				}
				return card;
			}),
		);

		const patchedCard = {
			front: newFront,
			back: newBack,
		};

		fetch(`https://training.nerdbord.io/api/v1/fischkapp/flashcards/${cardId}`, {
			method: 'PATCH',
			headers: {
				Authorization: 'secret_token',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(patchedCard),
		}).then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		});
	}

	function removeCard(cardId: string) {
		setCards(prevCards => prevCards.filter(card => card._id !== cardId));
		setVal(prevVal => prevVal - 1);

		fetch(`https://training.nerdbord.io/api/v1/fischkapp/flashcards/${cardId}`, {
			method: 'DELETE',
			headers: {
				Authorization: 'secret_token',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.status === 204) {
					return console.error('There was an error with delete');
				}
				return response.json();
			})
			.catch(error => {
				console.error('There was an error removing the flashcard:', error);
			});
	}

	if (isLoading) {
		return (
			<AppLayout>
				<AppHeader
					createNewCard={createNewCard}
					num={0}
				/>
				<p>Loading...</p>
			</AppLayout>
		);
	}

	return (
		<>
			<AppLayout>
				<AppHeader
					createNewCard={createNewCard}
					num={val}
				/>

				{newCard && (
					<NewCard
						onSaveClick={onSaveClick}
						checker={newCard}
						reset={resetHandler}
					/>
				)}

				<CardsList
					card={cards}
					updateCards={updateCards}
					removeCard={removeCard}
				/>
			</AppLayout>
		</>
	);
}

export default App;
