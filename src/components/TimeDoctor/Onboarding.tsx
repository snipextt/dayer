import { Modal, ModalContent } from "@nextui-org/react";
import { Auth } from "@/components/TimeDoctor/Auth";
import { Success } from "@/components/Result/Success";

import CheckIcon from "@/assets/check.png";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useServices } from "@/providers/ServiceProvider";
import {
  TimeDoctorAuthCredentials,
  TimedoctorCompany,
} from "@/schema/timedoctor";
import { checkValidTimedoctorAuth } from "@/utils/validtor";
import { SelectCompany } from "./SelectCompany";
import { useTimedoctorLoginDialogState } from "@/providers/GlobalPopupProvder";

export const TimedoctorOnboardingPopup = () => {
  const { workspaceService } = useServices();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState<TimedoctorCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [accpetedTerms, setAcceptedTerms] = useState<string | boolean>(false);
  const { open, setOpen } = useTimedoctorLoginDialogState();

  const transformName = (name: string = "") => {
    const words = name.split(" ");
    return words.map((word) => word.at(0)?.toUpperCase() + word.substring(1))
      .join(" ");
  };

  const connectTimeDoctor = async (credentials: TimeDoctorAuthCredentials) => {
    const { valid, error } = checkValidTimedoctorAuth(credentials);
    if (!valid) {
      setError(error!);
      return;
    }
    const res = await workspaceService.connectTimeDocotorAccount(credentials);
    if (res.error) {
      setError(res.message);
      return;
    }
    const companies = res.data?.map((c) => ({
      ...c,
      name: transformName(c.name),
    }));
    setCompanies(companies);
    setCurrentStep(1);
  };

  const connectCompany = async () => {
    if (!selectedCompany) {
      setError("Please select a company to connect");
      return;
    }
    const res = await workspaceService.connectTimeDoctorCompany(
      selectedCompany,
      accpetedTerms,
    );
    if (res.error) {
      setError(res.message);
      return;
    }
    setCurrentStep(2);
  };

  return (
    <Modal
      backdrop="blur"
      placement="center"
      isOpen={open}
      onOpenChange={setOpen}
    >
      <ModalContent className="min-w-fit">
        <AnimatePresence initial={false}>
          {currentStep === 0 && (
            <Auth
              callback={connectTimeDoctor}
              step={currentStep}
              error={error}
              setError={setError}
            />
          )}
          {currentStep === 1 && (
            <SelectCompany
              error={error}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              setAcceptedTerms={setAcceptedTerms}
              companies={companies}
              currentStep={currentStep}
              callback={connectCompany}
            />
          )}
          {currentStep === 2 &&
            (
              <Success
                className="w-full"
                animated
                step={currentStep}
                image={CheckIcon}
                title="Connected to TimeDoctor"
                description="You're all set! Your workspace is now connected to TimeDoctor."
              />
            )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
};
