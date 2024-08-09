import { ReactNode } from "react";

export const CurrentHandContentLayout = ({
  children,
  cards,
}: {
  children: ReactNode;
  cards: string[];
}) =>
  cards.length === 3 ? (
    <div className="p-2 grid grid-cols-3 grid-rows-1 gap-1 text-center text-white rounded-sm py-6">
      {children}
    </div>
  ) : (
    <div className="p-2 grid grid-cols-1 grid-rows-1 gap-1 text-center text-white rounded-sm py-6">
      {children}
    </div>
  );
