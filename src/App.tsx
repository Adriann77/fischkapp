import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import "./App.css";
import React, { useState, useEffect } from "react";
import { NewCard } from "./components/NewCard/NewCard";
import { CardsList } from "./components/CardsList";
import { v4 as uuidv4 } from "uuid";

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

const response: { front: string; back: string; id: string }[] = [];

// Function to collect data

function App() {
  const [newCard, setNewCard] = useState(false);
  const [val, setVal] = useState(response.length);
  const [cards, setCards] = useState(response);

  const getApiData = async () => {
    const response = await fetch(
      " https://training.nerdbord.io/api/v1/fischkapp/flashcards",
    ).then((response) => response.json());

    setCards(response);
    console.log(response);
    setVal(response.length);
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

  function updateCards(newHeader: string, newAnswer: string, cardId: number) {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, heading: newHeader, answer: newAnswer };
        }
        return card;
      }),
    );
  }

  function removeCard(cardId: number) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setVal((prevVal) => prevVal - 1);
  }

  return (
    <>
      <AppLayout>
        <AppHeader createNewCard={createNewCard} num={val} />

        {newCard && (
          <NewCard
            onSaveClick={(front, back) => {
              setCards((prevCards) => {
                return [{ front, back, id: uuidv4() }, ...prevCards];
              });
              setVal((prevVal) => prevVal + 1);
            }}
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
