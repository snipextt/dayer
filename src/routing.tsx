import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Root from "./routes/Root";
import OauthCallback from "./routes/OAuthCallback";
import Onboarding from "./routes/Onboarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/oauth2callback",
    element: <OauthCallback />,
  },
]);

export default router;
