import { ChangeEvent,  FC, useState } from "react";

import { useServices } from "@/providers/ServiceProvider";
import { checkValidTimedoctorAuth } from "@/utils/validtor";

import {
  Card,
  CardContent,
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

interface AuthProps {
  callback?: () => void;
  step: number;
}

enum FormField {
  Email,
  Password,
  Totp
}

export const Auth: FC<AuthProps> = ({ callback, step }) => {
  const { workspaceService } = useServices();

  const [totpEnabled, setTotpEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const credentials = { email, password, totp, totpEnabled };
    const { valid, error } = checkValidTimedoctorAuth(credentials);
    if (!valid) {
      setError(error!);
      return;
    }
   const res = await workspaceService.connectTimeDocotorAccount(credentials);
    if(res.error) {
      setError(res.message);
      return;
    }
    if (callback) {
      callback();
    }
  };

  const setValues = (e: ChangeEvent<HTMLInputElement>, field: FormField) => {
    setError('');
    const value = e.target.value;
    switch(field) {
      case FormField.Password:
        setPassword(value)
      break;
      case FormField.Email:
        setEmail(value)
      break;
      case FormField.Totp:
        setTotp(value)
    }
  }

  return (
    <AnimatedStep step={step}>
      <Card className="w-[550px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Connect TimeDoctor
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setValues(e, FormField.Email)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="**********"
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
          <Button onClick={handleSubmit} className="w-full">
            Connect
          </Button>
        </CardFooter>
      </Card>
    </AnimatedStep>
  );
};
