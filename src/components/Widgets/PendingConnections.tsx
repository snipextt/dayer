import { WorkspaceState } from "@/store/WorkspaceState";
import { Button } from "../Layout/Button";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { SingleLineBanner } from "../ui/Banner";
import { useTimedoctorLoginDialogState } from "@/providers/GlobalPopupProvder";
import { FC } from "react";

interface PendingActionCtaProps {
  title: string;
  description: string;
  ctaText: string;
  ctaCallback: () => void;
}

const PendingActionCta: FC<PendingActionCtaProps> = ({
  title,
  description,
  ctaText,
  ctaCallback,
}) => (
  <div className="flex justify-between items-center h-20">
    <div className="grid gap-1">
      <h4>{title}</h4>
      <h6 className="dark:text-zinc-400 text-zinc-700 text-xs">
        {description}
      </h6>
    </div>
    <Button onClick={ctaCallback}>{ctaText}</Button>
  </div>
);

export const WorkspaceCTA = () => {
  const [workspace] = useRecoilState(WorkspaceState);
  const { setOpen } = useTimedoctorLoginDialogState();

  if (!workspace?.pendingConnections) return null;

  return (
    <Accordion variant="splitted" className="mb-6 px-0">
      {workspace.pendingConnections?.length > 0
        ? (
          <AccordionItem
            title="Action required!"
            subtitle="Set up your extensions to make the most out of our workspace"
          >
            <PendingActionCta
              title="Timedoctor Integration"
              description="Activate your Timedoctor integration to get insights on your team's productivity"
              ctaText="Login"
              ctaCallback={() => setOpen(true)}
            />
          </AccordionItem>
        )
        : <></>}
    </Accordion>
  );
};
