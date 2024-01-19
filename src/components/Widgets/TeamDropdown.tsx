import { FC } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { WorkspaceTeam } from "@/schema/workspace";
import { useRecoilValue } from "recoil";
import { CurrentWorkspaceState } from "@/store/WorkspaceState";

interface TeamDropdownProps {
  selectedTeam: WorkspaceTeam | undefined;
  setSelectedTeam: (teamId: string) => void;
}

export const TeamDropdown: FC<TeamDropdownProps> = (
  { selectedTeam, setSelectedTeam },
) => {
  const { data, fetched } = useRecoilValue(CurrentWorkspaceState);
  if (!selectedTeam) selectedTeam = data?.teams?.[0];

  return fetched
    ? (
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedTeam?.name || "Select Team"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          color="primary"
          variant="shadow"
          selectionMode="single"
          aria-label="Static Actions"
          selectedKeys={selectedTeam?.id}
          onSelectionChange={keys => setSelectedTeam(Array.from(keys)[0] as string)}
        >
          {data!.teams?.map((team) => (
            <DropdownItem key={team.id}>{team.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
    : <></>;
}
