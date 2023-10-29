import { FC, ReactNode } from "react";

interface ErrorLabelProps {
  children: ReactNode
}

export const ErrorLabel: FC<ErrorLabelProps> = ({children}) => (
  <div className="text-error text-sm text-red-500">{children}</div>
)
