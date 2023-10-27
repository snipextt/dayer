import { Extension } from "@/schema/extension";
import { AuthenticatedHttpClient } from "./http";

export class ExtensionService {
  http: AuthenticatedHttpClient;
  baseUrl = "/extension";

  constructor(http: AuthenticatedHttpClient) {
    this.http = http;
  }

  async getExtensionList() {
    return await this.http.get<Extension[]>(`${this.baseUrl}/all`);
  }
}
