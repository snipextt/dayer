import { FC, ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AppLayout: FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`w-screen h-screen bg-gray-100 text-slate-700 dark:bg-gray-950 dark:text-slate-300 ${className}`}
    >
      {children}
    </div>
  );
};
