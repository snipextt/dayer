import { useEffect, useState } from "react";
import { CreateOrganization, useUser } from "@clerk/clerk-react";

import { useServices } from "@/providers/ServiceProvider";
import { FullHeightSpinner } from "@/components/Loaders/FullHeightSpinner";
import { Centered } from "@/components/Layout/Centered";

import { useNavigate, useSearchParams } from "react-router-dom";
import { SelectExtensions } from "@/components/Onboarding/SelectExtension";
import { Success } from "@/components/Result/Success";

// Assets
import CheckIcon from "@/assets/check.png";

enum OnboardingStep {
  CreateAccount,
  CreateOrganization,
  SelectExtensions,
  OnboardingComplete,
}

const Onboarding = () => {
  /**
   * Hooks
   */
  const { user } = useUser();
  const { userService } = useServices();
  const navigate = useNavigate();

  /**
   * State
   */
  const [currentOnboardingStep, setCurrentOnboardingStep] =
    useState<OnboardingStep>(OnboardingStep.CreateAccount);
  const [query] = useSearchParams();

  const afterCreateOrganizationUrl = window.location.href + "?step=2";

  /**
   * Effects
   */
  const completeOnboarding = async () => {
    await userService.completeOnboarding();
    await user?.reload();
    setCurrentOnboardingStep(OnboardingStep.CreateOrganization);
  };

  const setCurrentStep = () => {
    const step = parseInt(query.get("step") || "1");
    if (user!.externalId) {
      setCurrentOnboardingStep(step || 1);
    } else {
      completeOnboarding();
    }
  };

  useEffect(() => {
    setCurrentStep();
  }, []);

  if (currentOnboardingStep === OnboardingStep.CreateAccount)
    return <FullHeightSpinner />;

  if (currentOnboardingStep === OnboardingStep.CreateOrganization)
    return (
      <Centered>
        <CreateOrganization
          afterCreateOrganizationUrl={afterCreateOrganizationUrl}
        />
      </Centered>
    );

  if (currentOnboardingStep === OnboardingStep.SelectExtensions)
    return (
      <Centered>
        <SelectExtensions
          paginate={() =>
            setCurrentOnboardingStep(OnboardingStep.OnboardingComplete)
          }
        />
      </Centered>
    );

  if (currentOnboardingStep === OnboardingStep.OnboardingComplete)
    return (
      <Centered>
        <Success
          image={CheckIcon}
          title="Workspace Created"
          description="Redirecting to your workspace"
          callback={() => setTimeout(() => navigate("/"), 2000)}
        />
      </Centered>
    );

  return null;
};

export default Onboarding;
