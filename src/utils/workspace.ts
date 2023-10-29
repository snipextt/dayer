let currentWorkspaceId = "";

export function getCurrentWorkspaceId() {
  return currentWorkspaceId;
}

export function setCurrentWorkspaceId(id: string) {
  currentWorkspaceId = id;
}
