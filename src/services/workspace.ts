import { TimeDoctorAuthCredentials } from "@/schema/timedoctor";
import { AuthenticatedHttpClient } from "./http";
import { Workspace, WorkspaceResponse } from "@/schema/workspace";

export class WorkspaceSerice {
  http: AuthenticatedHttpClient;
  baseUrl = "/workspace";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  fetchCurrentWorkspace() {
    return this.http.get<WorkspaceResponse>(this.baseUrl);
  }

  createWorkspace(extensions: string[]) {
    return this.http.post<WorkspaceResponse>(this.baseUrl, extensions);
  }

  connectTimeDocotorAccount(credentails: TimeDoctorAuthCredentials) {
    return this.http.post<Workspace>(
      `${this.baseUrl}/timedoctor/connect`,
      credentails,
    );
  }
}
