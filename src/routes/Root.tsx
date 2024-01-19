import {
  ClerkLoaded,
  ClerkLoading,
  useUser,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { FullHeightSpinner } from "@/components/Loaders/FullHeightSpinner";
import { useRecoilState } from "recoil";
import { ExtensionState } from "@/store/ExtensionState";
import { useServices } from "@/providers/ServiceProvider";

const Root = () => {
  /**
   * Hooks
   */
  const { extensionService } = useServices();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  /**
   * State
   */
  const [_, setExtensions] = useRecoilState(ExtensionState);

  /**
   * Effects
   */
  const setAppData = async () => {
    const extensions = await extensionService.getExtensionList();
    if (extensions.error) return;

    setExtensions(extensions.data);
  };

  useEffect(() => {
    if (isLoaded) {
      if (!user?.externalId) navigate("/onboarding");
      else setAppData();
    }
  }, [user]);


  return (
    <AppLayout>
      <ClerkLoaded>
        <Outlet />
      </ClerkLoaded>
      <ClerkLoading>
        <FullHeightSpinner />
      </ClerkLoading>
    </AppLayout>
  );
};

export default Root;
