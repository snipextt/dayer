import { FC, ReactNode } from "react";

interface CenteredProps {
  children: ReactNode;
}

export const Centered: FC<CenteredProps> = ({ children }) => (
  <div className="h-full flex justify-center items-center">{children}</div>
);
