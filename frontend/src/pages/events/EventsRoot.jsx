import { Outlet, useRouteLoaderData } from "react-router-dom";
import EventsNavigation from "../../components/events/EventsNavigation";

function EventsRootLayout() {
  const token = useRouteLoaderData("root");
  return (
    <>
      {token && <EventsNavigation />}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
