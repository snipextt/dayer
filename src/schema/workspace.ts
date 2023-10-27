interface Workspace {
  id: string;
  name: string;
  clerkOrgId: string;
  extensions: string[];
}

interface WorkspaceState {
  workspace: Workspace;
  features: string[];
}
