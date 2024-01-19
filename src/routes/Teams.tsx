import { useState } from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { useServices } from "@/providers/ServiceProvider";
import { Button } from "@/components/Layout/Button";
import { TeamDropdown } from "@/components/Widgets/TeamDropdown";
import { Label } from "@/components/ui/Label";
import { WorkspaceState } from "@/store/WorkspaceState";
import { WorkspaceTeam } from "@/schema/workspace";
import { Resource } from "@/constants/resorce";
import { Centered } from "@/components/Layout/Centered";
import { Popover, PopoverTrigger, Spinner } from "@nextui-org/react";
import { TeamFlowGraphWrapper } from "@/components/Team/TeammFlowGraph";
import { AddTeamPopup } from "@/components/Team/AddTeamPopup";
import { useToast } from "@/hooks/toast";

export const Teams = () => {
  /*
   * Providers
   */
  const { workspaceService } = useServices();
  const { toast } = useToast();

  /*
   * States
   */
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [workspace, setWorkspace] = useRecoilState(WorkspaceState);
  const [selectedTeam, setSelectedTeam] = useState<WorkspaceTeam | undefined>(
    workspace?.teams?.[0],
  );

  /*
   * Effects
   */
  const { data: members, isLoading } = useSWR(
    Resource.WokrkspaceTeam + selectedTeam?.id,
    () => workspaceService.getTeam.call(workspaceService, selectedTeam?.id!),
  );

  const createTeam = async (team: Partial<WorkspaceTeam>) => {
    const res = await workspaceService.createTeam(team as WorkspaceTeam);
    if (res.error) {
      setPopoverOpen(false);
      toast({
        variant: "destructive",
        title: res.message,
      });
      return;
    }
    setWorkspace((prev) => ({
      ...prev!,
      teams: [...prev!.teams, res.data],
    }));
    setPopoverOpen(false);
    toast({
      title: "Team created successfully!",
    });
  };

  if (isLoading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Peers</Label>
        <section className="flex gap-4">
          <TeamDropdown
            selectedTeam={selectedTeam}
            setSelectedTeam={(id) =>
              setSelectedTeam(workspace?.teams.find((team) => team.id === id))}
          />
          <Popover
            placement="bottom-end"
            backdrop="blur"
            onOpenChange={(open) => setPopoverOpen(open)}
            isOpen={popoverOpen}
          >
            <PopoverTrigger>
              <Button>Create Team</Button>
            </PopoverTrigger>
            <AddTeamPopup callback={createTeam} />
          </Popover>
        </section>
      </div>
      <div className="relative h-[calc(100vh-270px)]">
        <TeamFlowGraphWrapper members={members?.data || []} teamId={selectedTeam?.id || ""} />
      </div>
    </div>
  );
};
