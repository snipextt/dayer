import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useServices } from "@/providers/ServiceProvider";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CheckboxGroup,
  Divider,
} from "@nextui-org/react";
import { CalendarCheckbox } from "../CalendarCheckbox";
import { GoogleCalendar } from "@/models/calendar";

interface SycnStepOneProps {
  calendarId: string;
  step: number;
  paginate: () => void;
}

export const SyncStepOne: FC<SycnStepOneProps> = ({ calendarId, step }) => {
  /**
   * Hooks
   */
  const { calendarService } = useServices();

  /**
   * State
   */
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  /**
   * Effects
   */
  const getAllLinkedCalendars = async () => {
    const res = await calendarService.getAllCalendarsForConnection(calendarId);
    res.data.forEach((calendar, i) => {
      if (calendar.primary) {
        res.data.unshift(calendar);
        res.data.splice(i + 1, 1);
        setSelectedCalendars((prev) => [...prev, calendar.id]);
      }
    });
    setCalendars(res.data);
  };

  const syncSelectedCalendars = async () => {
    const calendarsToSync = calendars.filter((calendar) =>
      selectedCalendars.includes(calendar.id),
    );
    await calendarService.syncGoogleCalendars(calendarsToSync);
  };

  useEffect(() => {
    if (!calendarId) return;
    getAllLinkedCalendars();
  }, []);

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-[400px]">
        <CardHeader className="flex flex-col justify-center gap-1">
          <h3 className="text-medium font-medium">Your Calendars</h3>
          <span className="text-sm text-gray-500">
            Only showing calendars you can write to
          </span>
        </CardHeader>

        <Divider />

        <CardBody className="p-4 pb-0">
          <CheckboxGroup
            value={selectedCalendars}
            onChange={(v) => setSelectedCalendars(v as string[])}
            classNames={{
              base: "w-full",
            }}
          >
            {calendars.map((calendar) => (
              <CalendarCheckbox
                key={calendar.id}
                showChip={calendar.primary}
                name={calendar.primary ? "Default" : calendar.summary}
                value={calendar.id}
                description={calendar.description || calendar.summary}
                timeZone={calendar.timeZone}
              />
            ))}
          </CheckboxGroup>
        </CardBody>

        <CardFooter>
          <Button
            color="primary"
            className="w-full"
            onClick={syncSelectedCalendars}
          >
            Sync Calendars
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
