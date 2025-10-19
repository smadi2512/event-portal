import { loadEvent, loadEvents } from "../../util/http";

//Event details loader
export async function eventDetailLoader({ params }) {
  const id = params.eventId;

  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

//Events loader
export function eventsLoader() {
  return {
    events: loadEvents(),
  };
}