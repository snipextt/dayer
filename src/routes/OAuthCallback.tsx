import { useSearchParams } from "react-router-dom";
import { GoogleCalendarOAuthCallback } from "@/components/GoogleCalendar/Callback";

const OAuthCallback = () => {
  /**
   * Hooks
   */
  const [searchParams] = useSearchParams();

  /**
   * Constants
   */
  const oauthType = searchParams.get("type")!;
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const scopes = (searchParams.get("scope") || "").split(" ");

  /**
   * Effects
   */

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      {oauthType === "google_calendar" && (
        <GoogleCalendarOAuthCallback
          state={state}
          code={code}
          scopes={scopes}
        />
      )}
    </div>
  );
};

export default OAuthCallback;
