import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import IconWrapper from "@/components/ui/IconWrapper";
import { LightningBoltIcon, PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-1/5 min-w-[280px] h-full p-3 py-1 bg-secondary flex flex-col justify-between">
      <div className="grid gap-3">
        <div className="p-2 text-lg h-[72px] flex justify-center flex-col gap-4 border-b">
          <h1>Logo</h1>
        </div>
        <Listbox>
          <ListboxItem
            onClick={() => navigate("./teams")}
            key="team"
            startContent={
              <IconWrapper label="Team" children={<PersonIcon />} />
            }
          >
            Peers
          </ListboxItem>
          <ListboxItem
            key="assistant"
            onClick={() => navigate("./assistant")}
            startContent={
              <IconWrapper label="Assistant" children={<LightningBoltIcon />} />
            }
          >
            Assistant
          </ListboxItem>
          {
            /*
          <ListboxSection title="Collaboration">
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
            */
          }
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
