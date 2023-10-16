import { FC, ReactNode } from "react";

import { CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";

import GoogleCalendarIcon from "@/assets/google-calender.svg?react";
import { OAuthError } from "./GoogleCalendar/OAuthError";

type OAuthProvider = "google_calendar" | "outlook_calendar";

interface OAuthCallbackInProgressProps {
  provider: OAuthProvider;
  step: number;
  error: string | null;
  retryAction: () => Promise<void>;
}

const config: Record<OAuthProvider, { label: string; icon: ReactNode }> = {
  google_calendar: {
    label: "Google Calendar",
    icon: <GoogleCalendarIcon />,
  },
  outlook_calendar: {
    label: "Outlook Calendar",
    icon: <GoogleCalendarIcon />,
  },
};

export const OAuthCallbackInProgress: FC<OAuthCallbackInProgressProps> = ({
  provider,
  step,
  error,
  retryAction,
}) => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center gap-3"
      key={step}
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.4 }}
    >
      {config[provider].icon}
      {!error && (
        <>
          <CircularProgress color="primary" />
          <h3 className="text-medium font-medium">
            Connecting your {config[provider].label}! It may take some time
          </h3>
        </>
      )}
      {error && <OAuthError error={error} retry={retryAction} />}
    </motion.div>
  );
};
