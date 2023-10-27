import { QuickActionsDialog } from "@/components/Popups/CommandDialog";
import { FC, ReactNode, createContext, useContext, useState } from "react";

enum GlobalPopupType {
  ACTION = "action",
}

interface GlobalPopupContextProps {
  [GlobalPopupType.ACTION]: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
}

const GlobalPopupContext = createContext<GlobalPopupContextProps>({
  [GlobalPopupType.ACTION]: {
    open: false,
    setOpen: () => {
      throw new Error("setOpen function must be overridden");
    },
  },
});

interface GlobalPopupProviderProps {
  children: ReactNode;
}

const useInitialGlobalPopupState = () => {
  const [actionPopup, setActionPopup] = useState<boolean>(false);

  return {
    [GlobalPopupType.ACTION]: {
      open: actionPopup,
      setOpen: setActionPopup,
    },
  };
};

const GlobalPopupProvider: FC<GlobalPopupProviderProps> = ({ children }) => {
  return (
    <GlobalPopupContext.Provider value={useInitialGlobalPopupState()}>
      {children}
      <QuickActionsDialog />
    </GlobalPopupContext.Provider>
  );
};

export const useActionDialogState = () => {
  const { [GlobalPopupType.ACTION]: actionPopup } =
    useContext(GlobalPopupContext);
  return { ...actionPopup };
};

export { GlobalPopupProvider, GlobalPopupContext, GlobalPopupType };
