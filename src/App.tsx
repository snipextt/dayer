import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { dark } from "@clerk/themes";
import router from "./routing";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import { ThemeMode, useThemeMode } from "@/providers/ThemeModeProvider";
import ServiceProvider from "@/providers/ServiceProvider";
import "./App.scss";
import { GlobalPopupProvider } from "./providers/GlobalPopupProvder";
import { useEffect } from "react";

if (!import.meta.env.VITE_CLERK_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_KEY;

const ClerkThemes = {
  [ThemeMode.LIGHT]: undefined,
  [ThemeMode.DARK]: dark,
};

function App() {
  const { themeMode } = useThemeMode();

  useEffect(() => {
    const doc = document.querySelector("html");
    if (!doc) return;
    doc.classList.remove("light", "dark");
    doc.classList.add(themeMode);
  }, [themeMode]);

  return (
    <div className="app">
      <GlobalPopupProvider>
        <NextUIProvider>
          <ClerkProvider
            appearance={{
              baseTheme: ClerkThemes[themeMode],
            }}
            publishableKey={clerkPubKey}
          >
            <SignedIn>
              <ServiceProvider>
                <RouterProvider router={router} />
              </ServiceProvider>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ClerkProvider>
        </NextUIProvider>
      </GlobalPopupProvider>
    </div>
  );
}

export default App;
