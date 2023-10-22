import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import IconWrapper from "@/components/ui/IconWrapper";
import {
  CalendarIcon,
  ReaderIcon,
  LightningBoltIcon,
  BarChartIcon,
  MixIcon,
  DashboardIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export const Sidebar = () => {
  return (
    <div className="w-1/5 min-w-[280px] h-full p-3 py-1 bg-secondary flex flex-col justify-between">
      <div className="grid gap-3">
        <div className="p-2 text-lg h-[72px] flex justify-center flex-col gap-4 border-b">
          <h1>Logo</h1>
        </div>
        <Listbox>
          <ListboxItem
            key="dashboard"
            startContent={
              <IconWrapper label="Dashboard" children={<DashboardIcon />} />
            }
          >
            Dashboard
          </ListboxItem>
          <ListboxItem
            key="team"
            startContent={
              <IconWrapper label="Team" children={<PersonIcon />} />
            }
          >
            Teams
          </ListboxItem>
          <ListboxSection title="Productivity">
            <ListboxItem
              key="stats"
              startContent={
                <IconWrapper label="Stats" children={<BarChartIcon />} />
              }
            >
              Stats
            </ListboxItem>
            <ListboxItem
              key="insights"
              startContent={
                <IconWrapper label="Insights" children={<MixIcon />} />
              }
            >
              Insights
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Collaboration">
            <ListboxItem
              key="calendar"
              startContent={
                <IconWrapper label="Calendar" children={<CalendarIcon />} />
              }
            >
              Calendar
            </ListboxItem>
            <ListboxItem
              key="memo"
              startContent={
                <IconWrapper label="Memo" children={<ReaderIcon />} />
              }
            >
              Memo
            </ListboxItem>
            <ListboxItem
              key="planner"
              startContent={
                <IconWrapper label="Memo" children={<LightningBoltIcon />} />
              }
            >
              Planner
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </div>

      <div className="bottom-section">
        <Listbox>
          <ListboxSection title="Settings">
            <ListboxItem key="integrations">Integrations</ListboxItem>
            <ListboxItem key="billing">Billing</ListboxItem>
            <ListboxItem key="settings">Account Settings</ListboxItem>
          </ListboxSection>
          <ListboxSection title="Get Help">
            <ListboxItem key="settings">Tickets</ListboxItem>
            <ListboxItem key="billing">Report an Issue</ListboxItem>
          </ListboxSection>
        </Listbox>
      </div>
    </div>
  );
};
