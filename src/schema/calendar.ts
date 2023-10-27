export interface CalendarConnections {
  id: string;
  email: string;
  provider: string;
  calenderIds: string[];
}

export interface GoogleCalendar {
  id: string;
  primary: boolean;
  selected: boolean;
  backgroundColor: string;
  description: string;
  summary: string;
  timeZone: string;
}
