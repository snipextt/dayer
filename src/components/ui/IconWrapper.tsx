import { Tooltip } from "@nextui-org/react";
import { FC, ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  label?: string;
  onClick?: () => void;
}

const IconWrapper: FC<IconWrapperProps> = ({ children, label, onClick }) =>
  label ? (
    <Tooltip content={label}>
      <div onClick={onClick} className="p-1 cursor-pointer">
        {children}
      </div>
    </Tooltip>
  ) : (
    <div onClick={onClick} className="p-1 cursor-pointer">
      {children}
    </div>
  );

export default IconWrapper;
