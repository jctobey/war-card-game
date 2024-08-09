import { ReactNode } from "react";

export const PlayerInfoContentLayout = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div className="grid grid-cols-2 gap-1 p-2 text-white text-center justify-items-center">
    {children}
  </div>
);
