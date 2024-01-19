import { DateRange } from "react-day-picker";
import { AuthenticatedHttpClient } from "./http";
import { AssistantStateResponse } from "@/schema/chat";

export class AssistantService {
  http: AuthenticatedHttpClient;
  baseUrl = import.meta.env.VITE_ASSISTANT_URL as string;

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  createMessage(message: string, dateRange: DateRange, teamId: string) {
    return this.http.post(`${this.baseUrl}/chat`, { message }, {
      headers: {
        "x-team-id": teamId,
        "x-start-date": dateRange.from?.toISOString(),
        "x-end-date": dateRange.to?.toISOString(),
      },
    });
  }

  getCurrentState() {
    return this.http.get<AssistantStateResponse>(`${this.baseUrl}`);
  }

  pollCompletion(
    teamId: string,
    dateRange: DateRange,
  ) {
    return this.http.get<AssistantStateResponse>(`${this.baseUrl}/poll`, {
      headers: {
        "x-team-id": teamId,
        "x-start-date": dateRange.from?.toISOString(),
        "x-end-date": dateRange.to?.toISOString(),
      },
    });
  }

  getFilePath(fileId: string) {
    return `${this.baseUrl}/file/${fileId}`;
  }
}
