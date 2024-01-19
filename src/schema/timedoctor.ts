export interface TimeDoctorAuthCredentials {
  email: string;
  password: string;
  totp?: string; 
  totpEnabled: boolean;
}

export interface TimedoctorCompany {
  id: string;
  name: string;
  role: string;
  companyTimezone: string;
  userCount: number;
}

export type TimedoctorConnectionResponse = TimedoctorCompany[];
