import { Checkbox, Chip, cn, User } from "@nextui-org/react";
import { FC } from "react";

interface CalendarCheckboxProps {
  name: string;
  value: string;
  showChip?: boolean;
  description?: string;
  timeZone?: string;
  chipDescription?: string;
}

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-white"
  >
    <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z">
    </path>
    <path d="M7 10v2h10V9H7z"></path>
  </svg>
);

export const CalendarCheckbox: FC<CalendarCheckboxProps> = ({
  name,
  value,
  showChip,
  description,
  timeZone,
  chipDescription,
}) => {

  return (
    <Checkbox
      aria-label={name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{
            name: undefined,
            icon: <CalendarIcon />,
            size: "sm",
            className: "min-w-[32px]",
          }}
          description={description?.slice(0, 44) +
            ((description?.length || 0) > 44 ? "..." : "")}
          name={name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{timeZone}</span>
          {showChip && (
            <Chip color={"success"} size="sm" variant="flat">
              {chipDescription || "Primary"}
            </Chip>
          )}
        </div>
      </div>
    </Checkbox>
  );
};
