import { ranks, suits } from "../constants";

const createDeck = () => {
  const deck = [];
  for (let rank of ranks) {
    for (let suit of suits) {
      deck.push(rank + suit);
    }
  }
  return deck;
};

export const deck = createDeck();

//fisher-yates shuffle
export const shuffleDeck = (deck: string[]) => {
  for (let i = 0; i < deck.length; i++) {
    //pick a random integer between index 0 and the length of deck
    const random = Math.floor(Math.random() * deck.length);
    //take the current index, and swap it with the index of another random card
    [deck[i], deck[random]] = [deck[random], deck[i]];
  }
  return deck;
};

export const divideDeck = (deck: string[]): string[][] => {
  const playerOneDeck = deck.slice(0, 26);
  const playerTwoDeck = deck.slice(26);
  return [playerOneDeck, playerTwoDeck];
};

export const drawCard = (deck: string[]) => deck.pop();

const getCardRank = (card: string) => {
  return ranks.indexOf(card.slice(0, -1));
};

export const handleWar = (
  playerOneDeck: string[],
  playerTwoDeck: string[],
  warPile: string[]
): string[][] => {
  if (playerOneDeck.length < 2 || playerTwoDeck.length < 2) {
    // Handle game over or reshuffling
    return [[], []];
  }
  // Draw cards for war
  const playerOneWarCards = playerOneDeck.slice(playerOneDeck.length - 2);
  const playerTwoWarCards = playerTwoDeck.slice(playerTwoDeck.length - 2);
  // Add to war pile

  const [playerOneCardRank, playerTwoCardRank] = [
    playerOneWarCards,
    playerTwoWarCards,
  ].map((deck) =>
    getCardRank(
      //get the card rank of the first item in the war pile
      deck[0] || ""
    )
  );
  // Compare the next set of cards
  if (playerOneCardRank === playerTwoCardRank) {
    // Recursively handle another war situation
    handleWar(playerOneDeck, playerTwoDeck, warPile);
  } else if (playerOneCardRank > playerTwoCardRank) {
    // Player 1 wins the war
    playerOneDeck.push(...warPile, ...playerOneWarCards, ...playerTwoWarCards);
    const newPlayerTwoDeck = playerTwoDeck.filter(
      (card) => !playerTwoWarCards.includes(card)
    );
    return [
      playerOneDeck,
      newPlayerTwoDeck,
      playerOneWarCards,
      playerTwoWarCards,
    ];
  } else {
    // Player 2 wins the war
    playerTwoDeck.push(...warPile, ...playerOneWarCards, ...playerTwoWarCards);
    const newPlayerOneDeck = playerOneDeck.filter(
      (card) => !playerOneWarCards.includes(card)
    );

    return [
      newPlayerOneDeck,
      playerTwoDeck,
      playerOneWarCards,
      playerTwoWarCards,
    ];
  }
  return [[], []];
};
export const getActiveHands = (
  playerOneDeck: string[],
  playerTwoDeck: string[]
) => {
  const playerOneDeckCopy = [...playerOneDeck];
  const playerTwoDeckCopy = [...playerTwoDeck];
  const playerOneCard = drawCard(playerOneDeckCopy) || "";
  const playerTwoCard = drawCard(playerTwoDeckCopy) || "";
  return [[playerOneCard], [playerTwoCard]];
};

export const handleTurn = (
  playerOneDeck: string[],
  playerTwoDeck: string[]
): string[][] => {
  const playerOneDeckCopy = [...playerOneDeck];
  const playerTwoDeckCopy = [...playerTwoDeck];

  const [playerOneCard, playerTwoCard] = [
    playerOneDeckCopy,
    playerTwoDeckCopy,
  ].map((deck) => drawCard(deck));

  const [playerOneCardRank, playerTwoCardRank] = [
    playerOneCard,
    playerTwoCard,
  ].map((card) => getCardRank(card || ""));

  if (playerOneCardRank === playerTwoCardRank) {
    return handleWar(playerOneDeckCopy, playerTwoDeckCopy, []);
  }
  if (playerOneCardRank > playerTwoCardRank) {
    playerOneDeckCopy.unshift(playerOneCard || "", playerTwoCard || "");
    playerTwoDeckCopy.filter((card) => card !== playerTwoCard);
    return [playerOneDeckCopy, playerTwoDeckCopy];
  }
  if (playerTwoCardRank > playerOneCardRank) {
    playerTwoDeckCopy.unshift(playerTwoCard || "", playerOneCard || "");
    playerOneDeckCopy.filter((card) => card !== playerOneCard);
    return [playerOneDeckCopy, playerTwoDeckCopy];
  }
  return [[], []];
};
