import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import OauthCallback from "./routes/OAuthCallback";
import Onboarding from "./routes/Onboarding";

import Root from "./routes/Root";
import AppRoot from "./routes/AppRoot";

import { Dashboard } from "./routes/Dashboard";

const appRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "",
    element: <Navigate to="/app/dashboard" />,
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
