import { TimeDoctorAuthCredentials } from "@/schema/timedoctor";
import { InputValid } from "@/schema/input";

export function checkValidTimedoctorAuth(credentials: TimeDoctorAuthCredentials): InputValid {
  let error = '';
  let valid = false;
  if(isEmpty(credentials.email)) {
    error = 'Please enter an email';
  } else if(!isEmailValid(credentials.email)) {
    error = 'Please enter a valid email';
  } else if(isEmpty(credentials.password)) {
    error = 'Please enter a password';
  } else if(credentials.totpEnabled && !isEmpty(credentials.totp)){
    error = 'Please enter an OTP';
  }
  valid = !error;
  return {
    error, valid
  }
}

export function isEmpty(str?: string) {
  return !str?.trim()
}

export function isEmailValid(email: string): boolean {
 return new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+").test(email)
}
