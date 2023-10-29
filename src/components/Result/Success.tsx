import { Card, CardBody } from "@nextui-org/react";

import { FC, useEffect, HTMLAttributes } from "react";
import { AnimatedStep } from "../Animated/AnimatedStep";

interface OnboardingSuccessProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  callback?: () => void;
  animated?: boolean;
  step?: number;
}

export const Success: FC<OnboardingSuccessProps> = ({
  image,
  title,
  description,
  callback,
  animated,
  step = 0,
  className
}) => {
  const Slot = animated ? AnimatedStep : "div";
  useEffect(() => {
    if (callback) callback();
  }, []);
  return (
    <Slot step={step}>
      <Card className={`w-[360px] ${className || ''}`}>
        <CardBody className="p-12 items-center flex flex-col">
          <img src={image} alt="Success" className="h-24 w-24" />
          <h4 className="text-md text-center mt-8">{title}</h4>
          <span className="text-sm text-gray-500 text-center mt-2">
            {description}
          </span>
        </CardBody>
      </Card>
    </Slot>
  );
};
