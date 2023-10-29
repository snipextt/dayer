import { FC, HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface AnimatedStepProps extends HTMLAttributes<HTMLDivElement> {
  step: number;
}

export const AnimatedStep: FC<AnimatedStepProps> = ({ step, children }) => {
  return (
    <motion.div
      className="max-w-[90vw]"
      key={step}
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};
