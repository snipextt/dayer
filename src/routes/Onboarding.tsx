import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import { useServices } from "../providers/ServiceProvider";
import { AppLayout } from "../components/AppLayout";

const Onboarding = () => {
  /**
   * Hooks
   */
  const { user, isLoaded } = useUser();
  const { userService } = useServices();
  const [onboardingInProgress] = useState(true);
  const navigate = useNavigate();

  /**
   * Effects
   */
  const completeOnboarding = async () => {
    await userService.completeOnboarding();
    await user?.reload();
    navigate("/");
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (user && user?.externalId) {
      navigate("/");
    }
    if (isLoaded && !user) {
      navigate("/");
    }
    if (user && !user?.externalId) {
      completeOnboarding();
    }
  }, [user]);

  if (onboardingInProgress)
    return (
      <AppLayout>
        <div className="h-full flex justify-center items-center flex-col">
          <CircularProgress />
        </div>
      </AppLayout>
    );

  return null;
};

export default Onboarding;
