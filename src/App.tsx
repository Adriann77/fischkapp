import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/AppLayout/AppLayout";
import "./App.css";
import React, { useState, useEffect } from "react";
import { NewCard } from "./components/NewCard/NewCard";
import { CardsList } from "./components/CardList/CardsList";
import { v4 as uuidv4 } from "uuid";
import { Loading } from "./components/Loading/Loading";

const response: { front: string; back: string; _id: string }[] = [];

function App() {
  const [newCard, setNewCard] = useState(false);
  const [val, setVal] = useState(response.length);
  const [cards, setCards] = useState(response);
  const [isLoading, setIsLoading] = useState(true);

  const getApiData = () => {
    fetch(" https://training.nerdbord.io/api/v1/fischkapp/flashcards")
      .then((response) => response.json())
      .then((response) => {
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

  async function onSaveClick(front: string, back: string) {
    const flashcardData = {
      front: front,
      back: back,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://training.nerdbord.io/api/v1/fischkapp/flashcards",
        {
          method: "POST",
          headers: {
            Authorization: "secret_token",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flashcardData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await getApiData();

      setCards((prevCards) => [{ front, back, _id: uuidv4() }, ...prevCards]);

      setVal((prevVal) => prevVal + 1);
    } catch (error) {
      console.error("There was an error adding the flashcard:", error);
      window.location.reload();
    }
  }

  function updateCards(newFront: string, newBack: string, cardId: string) {
    setCards((prevCards) =>
      prevCards.map((card) => {
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

    fetch(
      `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${cardId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "secret_token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchedCard),
      },
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  }

  async function removeCard(cardId: string) {
    try {
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      setVal((prevVal) => prevVal - 1);

      const response = await fetch(
        `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "secret_token",
          },
        },
      );

      if (response.ok) {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId),
        );
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("There was an error removing the flashcard:", error);
    }
  }

  if (isLoading) {
    return (
      <AppLayout>
        <AppHeader createNewCard={createNewCard} num={val} />
        <Loading />
        <CardsList
          card={cards}
          updateCards={updateCards}
          removeCard={removeCard}
        />
      </AppLayout>
    );
  }

  return (
    <>
      <AppLayout>
        <AppHeader createNewCard={createNewCard} num={val} />
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
