import { CalendarConnections, GoogleCalendar } from "../models/calendar";
import { AuthenticatedHttpClient } from "./http";

export class CalendarService {
  http: AuthenticatedHttpClient;
  baseUrl = "/calendar";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  async getGoogleOauthURI() {
    return this.http.get<{ authURI: string }>(`${this.baseUrl}/auth/google`);
  }

  async getAllLinkedConnections() {
    return this.http.get<{ calendars: CalendarConnections[] }>(
      `${this.baseUrl}/connections`,
    );
  }

  async getAllCalendarsForConnection(calendarId: string) {
    return this.http.get<GoogleCalendar[]>(
      `${this.baseUrl}/google?calendar_id=${calendarId}`,
    );
  }

  async syncGoogleCalendars(calendars: GoogleCalendar[]) {
    return this.http.post(`${this.baseUrl}/sync/google`, calendars);
  }
}
