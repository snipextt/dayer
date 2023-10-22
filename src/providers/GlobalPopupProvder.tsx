import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { FC, ReactNode, createContext, useContext, useState } from "react";

enum GlobalPopupType {
  COMMAND = "command",
}

interface GlobalPopupContextProps {
  [GlobalPopupType.COMMAND]: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
}

const GlobalPopupContext = createContext<GlobalPopupContextProps>({
  [GlobalPopupType.COMMAND]: {
    open: false,
    setOpen: () => {
      throw new Error("setOpen function must be overridden");
    },
  },
});

interface GlobalPopupProviderProps {
  children: ReactNode;
}

const GlobalPopupProvider: FC<GlobalPopupProviderProps> = ({ children }) => {
  const [commandPopup, setCommandPopup] = useState<boolean>(false);

  return (
    <GlobalPopupContext.Provider
      value={{
        [GlobalPopupType.COMMAND]: {
          open: commandPopup,
          setOpen: setCommandPopup,
        },
      }}
    >
      {children}
      <CommandDialog
        open={commandPopup}
        onOpenChange={() => setCommandPopup((v) => !v)}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <FaceIcon className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </GlobalPopupContext.Provider>
  );
};

export const useCommandModalState = () => {
  const { [GlobalPopupType.COMMAND]: commandPopup } =
    useContext(GlobalPopupContext);
  return { ...commandPopup };
};

export { GlobalPopupProvider, GlobalPopupContext, GlobalPopupType };
