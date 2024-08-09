import classNames from "classnames";
export const Card = ({ card }: { card: string }) => {
  const cardCharacters = card.split("");
  const cardIcon = cardCharacters[cardCharacters.length - 1];
  return (
    <div
      className={classNames(
        "border-white bg-white border-2 rounded-sm py-12 w-24 relative",
        {
          "text-black": ["♠", "♣"].includes(cardIcon),
          "text-red-600": ["♥", "♦"].includes(cardIcon),
        }
      )}
    >
      <span className="p-1 right-0 top-0 absolute">{card}</span>
      <span>{cardIcon}</span>
      <span className="px-1 py-.5 left-0 bottom-0 absolute rotate-180">
        {card}
      </span>
    </div>
  );
};
