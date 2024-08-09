import React from "react";
import { CurrentHandContentLayout } from "./layout";
import { Card } from "../Card";

export const CurrentHand = ({ cards }: { cards: string[] }) => (
  <CurrentHandContentLayout cards={cards}>
    {cards.length === 0 ? (
      <div className="border-white bg-white text-black border-2 rounded-sm py-12 w-24 relative">
        <span className="w-24">No Cards</span>
      </div>
    ) : (
      cards.map((card) => <Card key={card} card={card} />)
    )}
  </CurrentHandContentLayout>
);
