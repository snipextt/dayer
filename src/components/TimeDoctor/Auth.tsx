import { ChangeEvent, FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/Layout/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Switch } from "@nextui-org/react";
import { ErrorLabel } from "../ui/ErrorLabel";
import { AnimatedStep } from "../Animated/AnimatedStep";
import { TimeDoctorAuthCredentials } from "@/schema/timedoctor";
import { Checkbox } from "../ui/Checkbox";

interface AuthProps {
  callback: (credentials: TimeDoctorAuthCredentials) => Promise<void>;
  step: number;
  error: string;
  setError: (error: string) => void;
}

enum FormField {
  Email,
  Password,
  Totp,
}

export const Auth: FC<AuthProps> = ({ callback, step, setError, error }) => {
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");

  const setValues = (e: ChangeEvent<HTMLInputElement>, field: FormField) => {
    setError("");
    const value = e.target.value;
    switch (field) {
      case FormField.Password:
        setPassword(value);
        break;
      case FormField.Email:
        setEmail(value);
        break;
      case FormField.Totp:
        setTotp(value);
    }
  };

  return (
    <AnimatedStep step={step}>
      <Card className="w-[500px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login with your Time Doctor email and password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="jhon.has@email.com"
              onChange={(e) => setValues(e, FormField.Email)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setValues(e, FormField.Password)}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="totpEnabled">TOTP Enabled</Label>
              <Switch
                id="totpEnabled"
                onChange={() => setTotpEnabled((v) => !v)}
              />
            </div>
            {totpEnabled && (
              <Input
                id="totpCode"
                className="mt-1"
                placeholder="Enter OTP"
                value={totp}
                onChange={(e) => setValues(e, FormField.Totp)}
              />
            )}
          </div>
          {error && <ErrorLabel>{error}</ErrorLabel>}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => callback({ email, password, totp, totpEnabled })}
            className="w-full"
          >
            Connect
          </Button>
        </CardFooter>
      </Card>
    </AnimatedStep>
  );
};
