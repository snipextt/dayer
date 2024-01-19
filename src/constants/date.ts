import { add } from "date-fns";
import { startOfDay, today } from "@/utils/date";

export const definedRanges = [
  {
    label: "Yesterday",
    from: startOfDay(add(today(), { days: -1 })),
    to: add(startOfDay(today()), { seconds: -1 }),
  },
  {
    label: "Current Week",
    from: startOfDay(add(today(), { days: -today().getDay() })),
    to: add(startOfDay(today()), { seconds: -1 }),
  },
  {
    label: "Last Week",
    from: startOfDay(add(today(), { days: -today().getDay() - 7 })),
    to: add(startOfDay(add(today(), { days: -today().getDay() })), {
      seconds: -1,
    }),
  },
  {
    label: "Current Month",
    from: startOfDay(add(today(), { days: -today().getDate() + 1 })),
    to: add(startOfDay(today()), { seconds: -1 }),
  },
  {
    label: "Last Month",
    from: startOfDay(
      add(today(), { days: -today().getDate() + 1, months: -1 }),
    ),
    to: add(
      startOfDay(add(today(), { days: -today().getDate() + 1 })),
      { seconds: -1 },
    ),
  },
];
