import { redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";



//Create or update event action based on method
export async function manipulateEventAction({ request, params }) {
  const eventData = await request.formData();

  const method = request.method;
  let url = "http://localhost:8080/events";
  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `http://localhost:8080/events/${eventId}`;
  }

  const token = getAuthToken();
  if (!token) {
    throw new Response('Unauthorized', { status: 401 });
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: eventData,
  });
  if (response.status === 422) {
    const errorData = await response.json();
    return errorData;
  }
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return redirect("/events");
}

//Delete event action
export async function deleteEventAction({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return redirect('/events?toast=deleted');
}