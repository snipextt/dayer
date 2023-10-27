import { FC, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import ImageWrapper from "@/components/ui/ImageWrapper";

import { Button } from "@/components/Layout/Button";
import { ThemeMode, useThemeMode } from "@/providers/ThemeModeProvider";
import { useRecoilState } from "recoil";
import { ExtensionState } from "@/store/ExtensionState";
import { useServices } from "@/providers/ServiceProvider";

interface SelectExtensionsProps {
  paginate: () => void;
}

export const SelectExtensions: FC<SelectExtensionsProps> = ({ paginate }) => {
  /**
   * Hooks
   */
  const { workspaceService } = useServices();

  /**
   * State
   */
  const { themeMode } = useThemeMode();
  const [extensions] = useRecoilState(ExtensionState);
  const iconKey = themeMode === ThemeMode.LIGHT ? "iconLight" : "iconDark";
  const [selectedExtensions, setSelectedExtensions] = useState<
    Record<string, boolean>
  >({});
  const [submitting, setSubmitting] = useState(false);

  /**
   * Effects
   */
  const createWorkspace = async () => {
    setSubmitting(true);
    const extensions = Object.keys(selectedExtensions).filter(
      (key) => selectedExtensions[key],
    );
    await workspaceService.createWorkspace(extensions);
    setSubmitting(false);
    paginate();
  };

  return (
    <Card className="w-[460px]">
      <CardHeader className="flex justify-center">Enable Extensions</CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-3	gap-4">
        {extensions?.map(({ [iconKey]: imgSrc, name, id }) => (
          <div
            key={id}
            onClick={() =>
              setSelectedExtensions((v) => ({
                ...v,
                [id]: !v[id],
              }))
            }
            className={`rounded-lg border cursor-pointer flex flex-col items-center justify-center border p-4 ${
              selectedExtensions[id] ? "border-primary" : ""
            }`}
          >
            <ImageWrapper src={imgSrc} alt={name} />
          </div>
        ))}
      </CardBody>
      <CardFooter>
        <Button
          loading={submitting}
          disabled={submitting}
          className="w-full"
          onClick={createWorkspace}
        >
          Create Workspace
        </Button>
      </CardFooter>
    </Card>
  );
};
