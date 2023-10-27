import { FC, ReactNode, createContext, useContext } from "react";
import { CalendarService } from "../services/calendar";
import { AuthenticatedHttpClient } from "../services/http";
import { useAuth } from "@clerk/clerk-react";
import { UserService } from "../services/user";
import { ExtensionService } from "@/services/extension";
import { WorkspaceSerice } from "@/services/workspace";

interface ServiceProviderProps {
  children: ReactNode;
}

interface ServiceContextProps {
  calendarService: CalendarService;
  userService: UserService;
  extensionService: ExtensionService;
  workspaceService: WorkspaceSerice;
}

const ServiceContext = createContext<ServiceContextProps | undefined>(
  undefined,
);

const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const { getToken } = useAuth();
  const authticatedHttpClient = new AuthenticatedHttpClient(getToken);
  const services: ServiceContextProps = {
    calendarService: new CalendarService(authticatedHttpClient),
    userService: new UserService(authticatedHttpClient),
    extensionService: new ExtensionService(authticatedHttpClient),
    workspaceService: new WorkspaceSerice(authticatedHttpClient),
  };
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export function useServices(): ServiceContextProps {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("Service provider not initialized");
  }
  return context;
}

export default ServiceProvider;
