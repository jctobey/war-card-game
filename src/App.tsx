import React, { useState } from "react";
import { CurrentHand, WarButton, PlayerInfo } from "./components";
import {
  deck,
  divideDeck,
  getActiveHands,
  handleTurn,
  shuffleDeck,
} from "./utils";
import { PlayerInfoContentLayout } from "./components/PlayerInfo/layout";

function App() {
  const [decks, setDecks] = useState<string[][]>(divideDeck(shuffleDeck(deck)));
  const [playerOneDeck, playerTwoDeck] = decks;
  const [currentHands, setCurrentHands] = useState<string[][]>([[], []]);
  console.log(currentHands);
  const onPlay = () => {
    // Replace these functions with your actual logic to get active hands and handle turn
    const [playerOneCard, playerTwoCard] = getActiveHands(
      playerOneDeck,
      playerTwoDeck
    );
    setCurrentHands([playerOneCard, playerTwoCard]);

    const [
      newPlayerOneDeck,
      newPlayerTwoDeck,
      playerOneWarCards = [],
      playerTwoWarCards = [],
    ] = handleTurn(playerOneDeck, playerTwoDeck);

    setDecks([newPlayerOneDeck, newPlayerTwoDeck]);

    if (playerOneWarCards.length > 0 && playerTwoWarCards.length > 0) {
      setCurrentHands(([playerOnePrev, playerTwoPrev]) => [
        [...playerOnePrev, ...playerOneWarCards],
        [...playerTwoPrev, ...playerTwoWarCards],
      ]);
    }
  };

  return (
    <div className="bg-gray-800 w-screen h-screen">
      <header className="flex justify-center p-4">
        <h2 className="text-3xl font-bold text-white">War Card Game</h2>
      </header>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-2 p-2 justify-items-center">
          {currentHands.map((deck, index) => (
            <CurrentHand cards={deck} key={index} />
          ))}
        </div>
        <div className="flex justify-center">
          <WarButton onClick={onPlay} />
        </div>
        <PlayerInfoContentLayout>
          {decks.map((deck, index) => (
            <PlayerInfo deck={deck} index={index} key={index} />
          ))}
        </PlayerInfoContentLayout>
      </div>
    </div>
  );
}

export default App;
