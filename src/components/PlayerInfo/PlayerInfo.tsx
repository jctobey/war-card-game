export const PlayerInfo = ({
  deck,
  index,
}: {
  deck: string[];
  index: number;
}) => (
  <div className="border-white border-2 rounded p-2 gap-2 grid grid-cols-1">
    <h4 className="text-xl">{`Player ${index + 1}`}</h4>
    <h4 className="text-xl">{`Cards Remaining: ${deck.length}`}</h4>
  </div>
);
