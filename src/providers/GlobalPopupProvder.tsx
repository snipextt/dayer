import { QuickActionsDialog } from "@/components/Popups/CommandDialog";
import { TimedoctorOnboardingPopup } from "@/components/TimeDoctor/Onboarding";
import { createContext, FC, ReactNode, useContext, useState } from "react";

enum GlobalPopupType {
  ACTION = "action",
  TIMEDOCTOR_LOGIN = "timedoctor-login",
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
    [GlobalPopupType.TIMEDOCTOR_LOGIN]: {
      open: false,
      setOpen: () => {
        throw new Error("setOpen function must be overridden");
      },
    },
  },
});

interface GlobalPopupProviderProps {
  children: ReactNode;
}

const useInitialGlobalPopupState = () => {
  const [actionPopup, setActionPopup] = useState<boolean>(false);
  const [timedoctorLoginPopup, setTimedoctorLoginPopup] = useState<boolean>(
    false,
  );

  return {
    [GlobalPopupType.ACTION]: {
      open: actionPopup,
      setOpen: setActionPopup,
    },
    [GlobalPopupType.TIMEDOCTOR_LOGIN]: {
      open: timedoctorLoginPopup,
      setOpen: setTimedoctorLoginPopup,
    },
  };
};

const GlobalPopupProvider: FC<GlobalPopupProviderProps> = ({ children }) => {
  return (
    <GlobalPopupContext.Provider value={useInitialGlobalPopupState()}>
      {children}
      <QuickActionsDialog />
      <TimedoctorOnboardingPopup />
    </GlobalPopupContext.Provider>
  );
};

export const useActionDialogState = () => {
  const { [GlobalPopupType.ACTION]: actionPopup } = useContext(
    GlobalPopupContext,
  );
  return { ...actionPopup };
};

export const useTimedoctorLoginDialogState = () => {
  const { [GlobalPopupType.TIMEDOCTOR_LOGIN]: timedoctorLoginPopup } =
    useContext(GlobalPopupContext);
  return { ...timedoctorLoginPopup };
};

export { GlobalPopupContext, GlobalPopupProvider, GlobalPopupType };
