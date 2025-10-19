//Load event by id
export async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch details for selected event.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

//Load all events
export async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch events.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
