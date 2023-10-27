import { FC, useState } from "react";

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
import { useServices } from "@/providers/ServiceProvider";

interface AuthProps {
  callback?: () => void;
}

export const Auth: FC<AuthProps> = ({ callback }) => {
  const { workspaceService } = useServices();

  const [totpEnabled, setTotpEnabled] = useState(false);

  const handleSubmit = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Connect TimeDoctor
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="**********" />
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
            <Input id="totpCode" className="mt-1" placeholder="Enter OTP" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
};
