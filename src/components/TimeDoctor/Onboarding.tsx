import { Auth } from "@/components/TimeDoctor/Auth";
import { Success } from "@/components/Result/Success";

import CheckIcon from "@/assets/check.png";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <AnimatePresence initial={false}>
      {currentStep === 0 && <Auth callback={()=> setCurrentStep(1)} step={currentStep} />}
      {currentStep === 1 &&
        (
          <Success
            className="w-full"
            animated
            step={currentStep}
            image={CheckIcon}
            title="Connected to TimeDoctor"
            description="You're all set! You can starting using your TimeDoctor Integration"
          />
        )}
    </AnimatePresence>
  );
};
