import { Auth } from "@/components/TimeDoctor/Auth";
import { Stepper } from "@/components/ui/Stepper";

export const Dashboard = () => {
  return (
    <Stepper
      className="max-h-[550px] w-[500px]"
      orientation="vertical"
      maxSteps={3}
      currentStep={1}
    >
      <Auth />
      <div>Step 2</div>
    </Stepper>
  );
};
