import { Connections } from "./connection";

export interface Workspace {
  id: string;
  name: string;
  clerkOrgId: string;
  extensions: string[];
  connections: Connections;
}

export interface WorkspaceTeam {
  id: string;
  name: string;
  description: string;
  workspace: string;
}

export interface WorkspaceEvent {
  type: string;
  name: string;
  description: string;
}

export interface WorkspaceResponse {
  id: string;
  pendingConnections: WorkspaceEvent[];
  roleBasedResources: string[];
  teams: WorkspaceTeam[]; 
}

interface WorkspaceMemberMeta {
  source: string;
  timeDoctorId: string;
}

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  workspace: string;
  image: string;
  manager: string;
  team: string;
  user: string;
  roles: string[];
  permissions: string[];
  meta: WorkspaceMemberMeta;
}

export interface TimeDoctorReport {
}
