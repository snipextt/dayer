import { Divider } from "@nextui-org/react";
import { WorkspaceSwitcher } from "@/components/Popups/WorkspaceSwitcher";
import IconWrapper from "@/components/ui/IconWrapper";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ThemeMode, useThemeMode } from "@/providers/ThemeModeProvider";
import { useActionDialogState } from "@/providers/GlobalPopupProvder";

const AlternateThemeIcon = {
  [ThemeMode.LIGHT]: <MoonIcon />,
  [ThemeMode.DARK]: <SunIcon />,
};

export const Navbar = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const { setOpen } = useActionDialogState();

  return (
    <nav className="flex justify-between items-center border-b py-3 px-3 pr-3 gap-4">
      <input
        type="text"
        placeholder="Search anything"
        className="p-2 w-full text-sm bg-background outline-0"
      />
      <IconWrapper
        onClick={() =>
          setThemeMode(
            themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
          )}
        label="Toggle Theme"
        children={AlternateThemeIcon[themeMode]}
      />
      {
        /*
        * <IconWrapper
        onClick={() => setOpen(true)}
        label="Quick Actions"
        children={<RocketIcon />}
      />
        */
      }
      <div className="flex gap-2 min-w-[190px]">
        <Divider className="h-12" orientation="vertical" />
        <WorkspaceSwitcher />
      </div>
    </nav>
  );
};
