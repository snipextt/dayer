export interface TimeDoctorAuthCredentials {
  email: string;
  password: string;
  totp?: string; 
  totpEnabled: boolean;
}
