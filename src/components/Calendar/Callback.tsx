/** React core **/
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Components **/
import { OAuthCallbackInProgress } from "../CalendarConnectionInProgress";
import { Success } from "@/components/Result/Success";
import { SyncStepOne } from "./SyncStepOne";
import { AppLayout } from "@/components/Layout/AppLayout";
import { AnimatedStep } from "../Animated/AnimatedStep";

/** Utilities **/
import { useServices } from "@/providers/ServiceProvider";
import { googleCalendarScopeValid } from "@/utils/scope";
import { AnimatePresence } from "framer-motion";

/** Assets **/
import CheckIcon from "@/assets/check.png";

interface GoogleCalendarOAuthCallbackProps {
  state: string | null;
  code: string | null;
  scopes: string[];
}

export const GoogleCalendarOAuthCallback: FC<
  GoogleCalendarOAuthCallbackProps
> = ({ state, code, scopes }) => {
  /**
   * Hooks
   */
  const { userService, calendarService } = useServices();
  const navigate = useNavigate();

  /**
   * State
   */
  const [onboardingError, setOnboardingError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [calendarId, setCalendarId] = useState<string | null>(null);

  const startOnboarding = async () => {
    if (!state || !code) return;
    const isActionValid = googleCalendarScopeValid(scopes);
    if (!isActionValid) {
      setOnboardingError("Please allow Calendar acess to continue ");
      return;
    }
    const data = await userService.connectGoogleCalendar(state, code);
    if (data.error) {
      setOnboardingError(data.message);
      return;
    } else {
      setCalendarId(data.data);
    }
    setCurrentStep(1);
  };

  const connectGoogleCalender = async () => {
    const res = await calendarService.getGoogleOauthURI();
    window.open(res.data.authURI, "_self");
  };

  useEffect(() => {
    if (state) {
      startOnboarding();
    }
  }, [state, code]);

  return (
    <AppLayout className="flex flex-col justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {currentStep === 0 && (
          <OAuthCallbackInProgress
            step={0}
            retryAction={connectGoogleCalender}
            error={onboardingError}
            provider="google_calendar"
          />
        )}
        {currentStep === 1 && (
          <SyncStepOne
            connectionId={calendarId!}
            step={1}
            paginate={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 2 && (
          <AnimatedStep
            step={2}
            children={
              <Success
                image={CheckIcon}
                title="Conencted Google Calendar"
                description="Redirecting you to dashboard"
                callback={() => setTimeout(() => navigate("/"), 2000)}
              />
            }
          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
};
