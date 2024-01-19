import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Calendar } from "./Calendar";
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/utils/cn";
import { definedRanges } from "@/constants/date";

interface DatepickerProps {
  defaultRange?: DateRange;
  onChange?: (range: DateRange) => void;
}

export const Datepicker: FC<DatepickerProps> = ({
  defaultRange,
  onChange,
}) => {
  const [date, setDate] = useState<DateRange | undefined>(defaultRange);
  const [customSelectOpen, setCustomSelectOpen] = useState(true);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const setDatepickerState = (open: boolean) => {
    setDatepickerOpen(open);
  };

  useEffect(() => {
    if (
      (defaultRange?.from != date?.from || defaultRange?.to != date?.to) &&
      date?.from && date?.to
    ) {
      onChange?.(date!);
    }
  }, [datepickerOpen]);

  return (
    <Popover
      backdrop="blur"
      placement="bottom-end"
      color="secondary"
      isOpen={datepickerOpen}
      onOpenChange={setDatepickerState}
    >
      <PopoverTrigger>
        <Button
          id="date"
          variant={"bordered"}
          className={cn(
            "h-[40px] min-w-fit border-default justify-start text-left font-normal",
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date?.from
            ? (
              date.to
                ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                )
                : (
                  format(date.from, "LLL dd, y")
                )
            )
            : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        {!customSelectOpen && (
          <>
            {definedRanges.map(({ label, from, to }, i) => (
              <section
                key={label}
                className={cn(
                  `min-w-[220px] text-left  px-3 py-4 cursor-pointer hover:bg-secondary/80 border-b`,
                  i === 0 && "rounded-t-full",
                )}
                onClick={() => {
                  setDate({ from, to });
                  setDatepickerOpen(false);
                }}
              >
                {label}
              </section>
            ))}
            <section
              className="min-w-[220px] text-left  px-3 py-4 cursor-pointer rounded-b-full"
              onClick={() => setCustomSelectOpen(true)}
            >
              Custom Range
            </section>
          </>
        )}
        {customSelectOpen && (
          <div className="relative flex flex-col gap-3 p-4">
            <div className="flex justify-center items-center">
              {
                /*<ArrowLeftIcon
                className="absolute left-3 h-5 w-5 cursor-pointer"
                onClick={() => setCustomSelectOpen(false)}
              />*/
              }
              <span className="text-md">Select Range</span>
            </div>
            <Divider />
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                setDate(range);
              }}
              numberOfMonths={2}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
