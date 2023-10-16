import { Button } from "@nextui-org/react";
import { useServices } from "../providers/ServiceProvider";

const Home = () => {
  /**
   * Hooks
   */
  const { calendarService } = useServices();

  /**
   * Effects
   */
  const connectGoogleCalender = async () => {
    const res = await calendarService.getGoogleOauthURI();
    window.open(res.data.authURI, "_self");
  };

  const fetchAllCalenderConnection = async () => {
    const connections = await calendarService.getAllLinkedConnections();
    console.log(connections);
  };

  return (
    <div className="h-full flex flex-col gap-12 justify-center items-center">
      <Button color="primary" onClick={connectGoogleCalender}>
        Connect Google Account
      </Button>
      <Button color="primary" onClick={fetchAllCalenderConnection}>
        Fetch Events
      </Button>
    </div>
  );
};

export default Home;
