import { FC, ReactNode, createContext, useContext, useState } from "react";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeModeContextProps {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextProps>({
  themeMode: ThemeMode.LIGHT,
  setThemeMode: () => {
    throw new Error("setThemeMode function must be overridden");
  },
});

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.DARK);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);
  return { themeMode, setThemeMode };
};
