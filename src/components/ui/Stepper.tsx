import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/react";

interface StepperProps {
  children: ReactNode[];
  maxSteps: number;
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  allowNavigation?: boolean;
  className?: string;
}

export const Stepper: FC<StepperProps> = ({
  children,
  maxSteps,
  orientation = "horizontal",
  currentStep,
  className,
}) => {
  return (
    <div
      className={`flex ${
        orientation === "horizontal" ? "flex-col" : "flex-row"
      } gap-4 w-full h-full ${className || ""}`}
    >
      <div
        className={`flex ${
          orientation === "vertical" ? "flex-col" : "flex-row"
        } items-center justify-between gap-2 max-w-full`}
      >
        {new Array(maxSteps).fill(0).map((_, index) => {
          return (
            <div
              className={`flex
              ${orientation === "horizontal" ? "flex-row" : "flex-col"}
              items-center ${index + 1 < maxSteps ? "flex-1" : ""}`}
              key={index}
            >
              <div
                className={`min-w-[40px] cursor-pointer min-h-[40px] border border-slate-500 rounded-full flex items-center justify-center ${
                  index + 1 === currentStep
                    ? "bg-primary text-white p-1 border-white border-2 min-h-[46px] min-w-[46px]"
                    : ""
                }`}
              >
                {index + 1}
              </div>
              {index + 1 < maxSteps && (
                <Divider
                  className={`
                  ${
                    orientation === "horizontal"
                      ? "w-[calc(100%-36px)]"
                      : "h-[calc(100%-36px)] w-0.5"
                  }
                   ${index + 1 === currentStep ? "bg-primary" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <motion.div className={`flex-1 ${
        orientation === 'horizontal' ? '' : 'flex flex-col'
      }`}>{children[currentStep - 1]}</motion.div>
    </div>
  );
};
