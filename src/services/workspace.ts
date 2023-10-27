import { AuthenticatedHttpClient } from "./http";

export class WorkspaceSerice {
  http: AuthenticatedHttpClient;
  baseUrl = "/workspace";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  fetchCurrentWorkspace() {
    return this.http.get<Workspace>(this.baseUrl);
  }

  createWorkspace(extensions: string[]) {
    return this.http.post<Workspace>(this.baseUrl, extensions);
  }

  connectTimeDocotorAccount() {
    return this.http.get<Workspace>(`${this.baseUrl}/connect`);
  }
}
