import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import "./App.css";
import React, { useState } from "react";
import { NewCard } from "./components/NewCard/NewCard";
import { CardsList } from "./components/CardsList";

const initialCards = [
  { heading: "tytul", answer: "costamn", id: 1 },
  { heading: "lutyt", answer: "nmatsoc", id: 2 },
];

function App() {
  const [newCard, setNewCard] = useState(false);
  const [val, setVal] = useState(initialCards.length);
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
            onSaveClick={(heading, answer) => {
              setCards((prevCards) => {
                return [{ heading, answer, id: Math.random() }, ...prevCards];
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
