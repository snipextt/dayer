import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { Divider, Spinner } from "@nextui-org/react";
import { useServices } from "@/providers/ServiceProvider";
import { useRecoilState } from "recoil";
import { WorkspaceState } from "@/store/WorkspaceState";
import { useOrganization, useUser } from "@clerk/clerk-react";
import { Centered } from "@/components/Layout/Centered";
import { Resource } from "@/constants/resorce";
import { setCurrentWorkspaceId } from "@/utils/workspace";

const AppRoot = () => {
  /*
   * Providers
   */
  const { workspaceService } = useServices();
  const { organization } = useOrganization();
  const { user } = useUser();
  const navigate = useNavigate();

  /*
   * States
   */
  const [_, setWorkSpace] = useRecoilState(WorkspaceState);
  const [workspaceDataReady, setWorkspaceDataReacdy] = useState(false);

  /*
   * Effects
   */
  setCurrentWorkspaceId(
    organization?.publicMetadata?.workspaceId as string ||
      user?.publicMetadata?.workspaceId as string,
  );
  const { data: workspace, error, isLoading, isValidating } = useSWR(
    Resource.Workspace,
    workspaceService.fetchCurrentWorkspace.bind(workspaceService),
    {
      revalidateOnFocus: false,
    },
  );
  const organizationId = useRef(organization?.id);

  const setWorkspaceData = async () => {
    console.log("setWorkspaceData");
    if (!workspace || error || workspace?.error) return;

    setWorkSpace(workspace.data);
    setWorkspaceDataReacdy(true);
  };

  useEffect(() => {
    if (!organization && !user?.organizationMemberships.length) {
      navigate("/onboarding?step=1");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isValidating) {
      setWorkspaceData();
    }
  }, [isLoading, isValidating]);

  useEffect(() => {
    if (organizationId.current !== organization?.id) {
      organizationId.current = organization?.id;
      mutate(Resource.Workspace);
      mutate(Resource.WokrkspaceTeam);
      setWorkspaceDataReacdy(false);
    }
  }, [organization]);

  /*
   * Render
   */
  if (!workspaceDataReady) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  return (
    <div className="h-full flex">
      <Sidebar />
      <Divider orientation="vertical" />
      <div className="container p-0">
        <Navbar />
        <div className="h-[calc(100vh-77px)] p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppRoot;
