import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { FullHeightSpinner } from "@/components/Loaders/FullHeightSpinner";

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
      <ClerkLoaded>
        <Outlet />
      </ClerkLoaded>
      <ClerkLoading>
        <FullHeightSpinner />
      </ClerkLoading>
    </AppLayout>
  );
};

export default Root;
