import { Card, CardBody } from "@nextui-org/react";

import { FC, useEffect } from "react";

interface OnboardingSuccessProps {
  image: string;
  title: string;
  description: string;
  callback: () => void;
}

export const Success: FC<OnboardingSuccessProps> = ({
  image,
  title,
  description,
  callback,
}) => {
  useEffect(() => {
    callback();
  }, []);
  return (
    <Card className="w-[360px]">
      <CardBody className="p-12 items-center flex flex-col">
        <img src={image} alt="Success" className="h-24 w-24" />
        <h4 className="text-md text-center mt-8">{title}</h4>
        <span className="text-sm text-gray-500 text-center mt-2">
          {description}
        </span>
      </CardBody>
    </Card>
  );
};
