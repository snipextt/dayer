import {
  TimeDoctorAuthCredentials,
  TimedoctorConnectionResponse,
} from "@/schema/timedoctor";
import { AuthenticatedHttpClient } from "./http";
import { WorkspaceMember, WorkspaceResponse, WorkspaceTeam } from "@/schema/workspace";
import { getCurrentWorkspaceId } from "@/utils/workspace";

export class WorkspaceSerice {
  http: AuthenticatedHttpClient;
  baseUrl = "/workspace";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  fetchCurrentWorkspace() {
    if (!getCurrentWorkspaceId()) return;
    return this.http.get<WorkspaceResponse>(this.baseUrl);
  }

  createWorkspace(extensions: string[]) {
    return this.http.post<WorkspaceResponse>(this.baseUrl, extensions);
  }

  connectTimeDocotorAccount(credentails: TimeDoctorAuthCredentials) {
    return this.http.post<TimedoctorConnectionResponse>(
      `${this.baseUrl}/timedoctor/connect`,
      credentails,
    );
  }

  connectTimeDoctorCompany(company: string, parseScreencast: boolean) {
    return this.http.post<TimedoctorConnectionResponse>(
      `${this.baseUrl}/timedoctor/company/`,
      {
        company,
        parseScreencast
      },
    );
  }

  createTeam(team: WorkspaceTeam) {
    return this.http.post<WorkspaceTeam>(`${this.baseUrl}/team`, team);
  }
  
  getTeam(teamId: string) {
    return this.http.get<WorkspaceMember[]>(`${this.baseUrl}/team/${teamId}`);
  }

  insights(startDate: string, endDate: string, team: string) {
    if(!team) return;
    return this.http.get<Record<string, any>>(`${this.baseUrl}/insights?startDate=${startDate}&endDate=${endDate}&team=${team}`);
  }
}
