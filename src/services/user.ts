import { AuthenticatedHttpClient } from "./http";

export class UserService {
  http: AuthenticatedHttpClient;
  baseUrl = "";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  async connectGoogleCalendar(state: string, code: string) {
    return this.http.get<string>(
      `/callback/oauth/google?state=${state}&code=${code}`,
    );
  }

  async completeOnboarding() {
    return this.http.post(`/onboarding`);
  }
}
