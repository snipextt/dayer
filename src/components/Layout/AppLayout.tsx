import { FC, ReactNode } from "react";
import { Toaster } from "@/components/ui/Toaster";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AppLayout: FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <>
      <div className={`w-screen h-screen ${className || ""}`}>{children}</div>
      <Toaster />
    </>
  );
};
