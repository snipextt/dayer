import { useEffect, useState } from "react";

import { CreateOrganization, useUser } from "@clerk/clerk-react";

import { useServices } from "@/providers/ServiceProvider";
import { FullHeightSpinner } from "@/components/Loaders/FullHeightSpinner";
import { Centered } from "@/components/Layout/Centered";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { Button } from "@/components/Layout/Button";
import { ThemeMode, useThemeMode } from "@/providers/ThemeModeProvider";

import JiraDarkModeIcon from "@/assets/logo-gradient-white-jira.svg?react";
import JiraLightModeIcon from "@/assets/logo-gradient-blue-jira.svg?react";
import ClickUpDarkModeIcon from "@/assets/clickupdark.png";
import ClickUpLightModeIcon from "@/assets/clickupwhite.png";
import TimedoctorIcon from "@/assets/timedoctor.png";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { useSearchParams } from "react-router-dom";

enum OnboardingStep {
  CreateAccount,
  CreateOrganization,
  SelectExtensions,
}

const Icons = {
  [ThemeMode.LIGHT]: [
    {
      icon: <JiraLightModeIcon className="w-32" />,
    },
    {
      icon: <ImageWrapper src={TimedoctorIcon} />,
    },
    {
      icon: <ImageWrapper src={ClickUpLightModeIcon} />,
    },
  ],
  [ThemeMode.DARK]: [
    {
      icon: <JiraDarkModeIcon className="w-32" />,
    },
    {
      icon: <ImageWrapper src={TimedoctorIcon} />,
    },
    {
      icon: <ImageWrapper src={ClickUpDarkModeIcon} />,
    },
  ],
};

const SelectExtensions = () => {
  const { themeMode } = useThemeMode();
  const icons = Icons[themeMode];
  const [selectedExtensions, setSelectedExtensions] = useState<
    Record<number, boolean>
  >({});

  return (
    <Card className="w-[460px]">
      <CardHeader className="flex justify-center">Enable Extensions</CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-3	gap-4">
        {icons.map(({ icon }, index) => (
          <div
            onClick={() =>
              setSelectedExtensions((v) => ({
                ...v,
                [index]: !v[index],
              }))
            }
            className={`rounded-lg border cursor-pointer flex flex-col items-center justify-center border p-4 ${
              selectedExtensions[index] ? "border-primary" : ""
            }`}
          >
            {icon}
          </div>
        ))}
      </CardBody>
      <CardFooter>
        <Button className="w-full">Create Workspace</Button>
      </CardFooter>
    </Card>
  );
};

const Onboarding = () => {
  /**
   * Hooks
   */
  const { user } = useUser();
  const { userService } = useServices();

  /**
   * State
   */
  const [currentOnboardingStep, setCurrentOnboardingStep] =
    useState<OnboardingStep>(OnboardingStep.SelectExtensions);
  const [query] = useSearchParams();

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
        <CreateOrganization />
      </Centered>
    );

  if (currentOnboardingStep === OnboardingStep.SelectExtensions)
    return (
      <Centered>
        <SelectExtensions />
      </Centered>
    );

  return null;
};

export default Onboarding;
