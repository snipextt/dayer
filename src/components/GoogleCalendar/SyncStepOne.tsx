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
  Skeleton,
} from "@nextui-org/react";
import { CalendarCheckbox } from "../CalendarCheckbox";
import { GoogleCalendar } from "@/models/calendar";

interface SycnStepOneProps {
  connectionId: string;
  step: number;
  paginate: () => void;
}

export const SyncStepOne: FC<SycnStepOneProps> = ({
  connectionId,
  step,
  paginate,
}) => {
  /**
   * Hooks
   */
  const { calendarService } = useServices();

  /**
   * State
   */
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Effects
   */
  const getAllLinkedCalendars = async () => {
    const res =
      await calendarService.getAllCalendarsForConnection(connectionId);
    res.data.forEach((calendar, i) => {
      if (calendar.primary) {
        res.data.unshift(calendar);
        res.data.splice(i + 1, 1);
        setSelectedCalendars((prev) => [...prev, calendar.id]);
      }
    });
    setCalendars(res.data);
    setLoading(false);
  };

  const syncSelectedCalendars = async () => {
    const calendarsToSync = calendars.filter((calendar) =>
      selectedCalendars.includes(calendar.id),
    );
    await calendarService.syncGoogleCalendars(connectionId, calendarsToSync);
    paginate();
  };

  useEffect(() => {
    if (!connectionId) return;
    getAllLinkedCalendars();
  }, []);

  return (
    <motion.div
      className="max-w-[90vw]"
      key={step}
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 1000 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-[440px] max-w-[100%]">
        <CardHeader className="flex flex-col justify-center gap-1">
          <h3 className="text-medium font-medium">Your Calendars</h3>
          <span className="text-sm text-gray-500">
            Only showing calendars you can write to
          </span>
        </CardHeader>

        <Divider />

        <CardBody className="p-4 pb-0">
          {!loading && (
            <CheckboxGroup
              value={selectedCalendars}
              onChange={(v) => setSelectedCalendars(v as string[])}
              isDisabled={calendars.length === 0}
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
          )}
          {loading &&
            [1, 2].map((_, i) => (
              <Skeleton key={i} className="h-16 my-2 w-full rounded-lg" />
            ))}
        </CardBody>
        <CardFooter>
          {!loading && (
            <Button
              color="primary"
              className="w-full"
              onClick={syncSelectedCalendars}
            >
              Sync Calendars
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
