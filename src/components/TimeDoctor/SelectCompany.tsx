import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { AnimatedStep } from "../Animated/AnimatedStep";
import { Button } from "@/components/ui/Button";
import { FC } from "react";
import { TimedoctorCompany } from "@/schema/timedoctor";
import { ErrorLabel } from "../ui/ErrorLabel";
import { Label } from "../ui/Label";
import { Toggle } from "../ui/Toggle";
import { Chip } from "@nextui-org/react";
import { Checkbox } from "../ui/Checkbox";

interface SelectCompanyProps {
  currentStep: number;
  setSelectedCompany: (company: string) => void;
  setAcceptedTerms: (accepted: boolean | string) => void;
  selectedCompany: string;
  callback: () => Promise<void>;
  companies: TimedoctorCompany[];
  error: string;
}

export const SelectCompany: FC<SelectCompanyProps> = (
  {
    currentStep,
    callback,
    companies,
    selectedCompany,
    setSelectedCompany,
    setAcceptedTerms,
    error,
  },
) => {
  return (
    <AnimatedStep step={currentStep}>
      <Card className="w-[500px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-xl">Almost there!</CardTitle>
          <CardDescription>
            Select a copmany to sync workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {companies.map((company) => (
            <Toggle
              key={company.id}
              variant="outline"
              className="h-auto"
              pressed={selectedCompany === company.id}
              onClick={() => setSelectedCompany(company.id)}
            >
              <div className="flex items-center justify-between w-full py-3 px-1">
                <div className="flex flex-col items-start gap-1">
                  <Label>{company.name}</Label>
                  <p className="text-sm text-gray-500">
                    {company.companyTimezone}
                  </p>
                </div>
                <div>
                  <Chip color="default">{company.userCount} Users</Chip>
                </div>
              </div>
            </Toggle>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(v) => setAcceptedTerms(v)} />
            <label
              htmlFor="image"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Analyze screencasts from this company
            </label>
          </div>
          {error && <ErrorLabel>{error}</ErrorLabel>}
        </CardContent>
        <CardFooter>
          <Button onClick={() => callback()} className="w-full">
            Connect
          </Button>
        </CardFooter>
      </Card>
    </AnimatedStep>
  );
};
