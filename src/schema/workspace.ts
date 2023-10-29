import { Connections } from "./connection";

export interface Workspace {
  id: string;
  name: string;
  clerkOrgId: string;
  extensions: string[];
  connections: Connections;
}

export interface WorkspaceResponse {
  id: string;
  pendingConnections: string[];
  roleBasedResources: string[];
}
