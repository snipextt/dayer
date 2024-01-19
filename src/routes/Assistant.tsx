import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { WorkspaceCTA } from "@/components/Widgets/PendingConnections";
import { TeamDropdown } from "@/components/Widgets/TeamDropdown";
import { WorkspaceTeam } from "@/schema/workspace";
import { WorkspaceState } from "@/store/WorkspaceState";
import { useRecoilState } from "recoil";
import { Datepicker } from "@/components/ui/Datepicker";
import { definedRanges } from "@/constants/date";
import { DateRange } from "react-day-picker";
import { ChatLayout } from "@/components/Chat/Layout";

export const Assistant = () => {
  const [workspace] = useRecoilState(WorkspaceState);
  const [selectedTeam, setSelectedTeam] = useState<WorkspaceTeam | undefined>(
    workspace?.teams?.[0],
  );
  const [range, setRange] = useState<DateRange>(definedRanges[0]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <WorkspaceCTA />
      <div className="flex flex-row justify-between">
        <Label className="text-xl">Assistant</Label>
        <div className="flex gap-4">
          <Datepicker onChange={setRange} defaultRange={range} />
          <TeamDropdown
            selectedTeam={selectedTeam}
            setSelectedTeam={(id) =>
              setSelectedTeam(workspace?.teams.find((team) => team.id === id))}
          />
        </div>
      </div>
      <ChatLayout selectedRange={range} teamId={selectedTeam?.id || ""} />
    </div>
  );
};
