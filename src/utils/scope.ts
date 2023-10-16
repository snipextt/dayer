import { RequiredScopesGoogleCalendar } from "../constants/scopes";

export function googleCalendarScopeValid(scopes: string[]): boolean {
  return RequiredScopesGoogleCalendar.every((scope) => scopes.includes(scope));
}
