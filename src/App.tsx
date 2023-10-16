import { NextUIProvider } from "@nextui-org/react";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routing";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import ServiceProvider from "./providers/ServiceProvider";

if (!import.meta.env.VITE_CLERK_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_KEY;

function App() {
  return (
    <div className="dark">
      <NextUIProvider>
        <ClerkProvider publishableKey={clerkPubKey}>
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
    </div>
  );
}

export default App;
