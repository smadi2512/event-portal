import { createBrowserRouter } from "react-router-dom";

//import all the required app's pages
import RootLayout from "./pages/Root";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";

//The events' pages
import EventsRootLayout from "./pages/events/EventsRoot";
import EventsPage from "./pages/events/Events";
import EditEventPage from "./pages/events/EditEvent";
import EventDetailPage from "./pages/events/EventDetail";
import NewEventPage from "./pages/events/NewEvent";

//The events' actions and loaders
import { deleteEventAction, manipulateEventAction } from "./lib/actions/eventActions";
import { eventsLoader, eventDetailLoader } from "./lib/loaders/eventLoaders";

//The newsletter and action
import NewsletterPage from "./pages/Newsletter";
import { newsletterAction } from "./lib/actions/newsletterActions";

//The Authentication and actions
import AuthenticationPage from "./pages/auth/Authentication";
import { logoutAction, authAction } from "./lib/actions/authActions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);