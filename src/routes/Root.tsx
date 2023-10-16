import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";

const Root = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user?.externalId) {
      navigate("/onboarding");
    }
  }, [user]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default Root;
