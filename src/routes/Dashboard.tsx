import { Onboarding } from "@/components/TimeDoctor/Onboarding";
import { SingleLineBanner } from "@/components/ui/Banner";
import { CurrentExtensionState } from "@/store/ExtensionState";
import { CurrentWokspaceState } from "@/store/WorkspaceState";
import { Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

export const Dashboard = () => {
  const workspaceState = useRecoilValue(CurrentWokspaceState);
  const extensionState = useRecoilValue(CurrentExtensionState);
  const [pendingConnections, setPendingConnections] = useState<string[]>([]);
  const [
    pendingConnectionsBottomsheetOpen,
    setPendingConnectionsBottomsheetOpen,
  ] = useState(false);

  const bannersSet = useRef(false);

  const renderWorkspaceBanners = () => {
    bannersSet.current = true;
    const pendingConnections = workspaceState.data?.pendingConnections!;
    setPendingConnections(pendingConnections);
  };

  const togglePendingConnectionBottomSheet = () => {
    setPendingConnectionsBottomsheetOpen((v) => !v);
  };

  useEffect(() => {
    if (
      workspaceState.fetched && extensionState.fetched && !bannersSet.current
    ) renderWorkspaceBanners();
  }, [workspaceState]);

  return (
    <>
      <div className="flex flex-col">
        {!!pendingConnections.length && (
          <SingleLineBanner
            title="Set up your extensions"
            description="To make the most out of our workspace, please set up connections to the
        enabled extensions"
            ctaText="Complete Set Up"
            ctaCallback={togglePendingConnectionBottomSheet}
          />
        )}
      </div>

      <Modal
        backdrop="blur"
        placement="center"
        isOpen={pendingConnectionsBottomsheetOpen}
        onOpenChange={togglePendingConnectionBottomSheet}
        hideCloseButton={true}
      >
        <ModalContent className="min-w-fit"><Onboarding /></ModalContent>
      </Modal>
    </>
  );
};
