import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import OauthCallback from "./routes/OAuthCallback";
import Onboarding from "./routes/Onboarding";

import Root from "./routes/Root";
import AppRoot from "./routes/AppRoot";

import { Teams } from "./routes/Teams";
import { Assistant } from "./routes/Assistant";

const appRoutes: RouteObject[] = [
  {
    path: "teams",
    element: <Teams />,
  },
  {
    path: "assistant",
    element: <Assistant />
  },
  {
    path: "",
    element: <Navigate to="/app/assistant" />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/app",
        element: <AppRoot />,
        children: appRoutes,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/",
        element: <Navigate to="/app" />,
      },
    ],
  },
  {
    path: "/oauth2callback",
    element: <OauthCallback />,
  },
]);

export default router;
