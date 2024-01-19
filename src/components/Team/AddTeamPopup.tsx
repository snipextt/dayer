import {
  Input,
  PopoverContent,
  Textarea,
} from "@nextui-org/react";
import { Label } from "../ui/Label";
import { Button } from "../Layout/Button";
import { FC, useState } from "react";
import { WorkspaceTeam } from "@/schema/workspace";

interface AddTeamProps {
  error?: string;
  callback: (team: Partial<WorkspaceTeam>) => Promise<void>;
}

export const AddTeamPopup: FC<AddTeamProps> = ({ callback }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <PopoverContent>
      <div className="px-2 py-5 w-96 gap-4 flex flex-col">
        <Label className="text-lg text-center">Create Team</Label>
        <div className="flex flex-col gap-4">
          <Input
            className="rounded-md"
            placeholder="Type Name"
            label="Team Name"
            labelPlacement="outside"
            defaultValue={name}
            onValueChange={setName}
          />
          <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter description"
            defaultValue={description}
            onValueChange={setDescription}
          />
        </div>
        <Button
          loading={loading}
          className="w-full"
          onClick={() => {
            setLoading(true);
            callback({ name, description });
          }}
        >
          Create
        </Button>
      </div>
    </PopoverContent>
  );
};
