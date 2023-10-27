import {
  ClerkLoaded,
  ClerkLoading,
  useOrganization,
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
  const { extensionService, workspaceService } = useServices();
  const { user, isLoaded } = useUser();
  const { organization } = useOrganization();
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

  const setWorkspaceData = async () => {
    const workspace = await workspaceService.fetchCurrentWorkspace();
    if (workspace.error) return;

    if (!workspace.data) navigate("/onboarding?step=2");
  };

  useEffect(() => {
    if (isLoaded) {
      if (!user?.externalId) navigate("/onboarding");
      else setAppData();
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded) setWorkspaceData();
  }, [organization]);

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
