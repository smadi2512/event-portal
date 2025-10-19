import { Suspense, useEffect } from "react";
import { useLoaderData, Await, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import EventsList from "../../components/events/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const toastType = searchParams.get("toast");
    if (toastType === "deleted") {
      toast.success("Event deleted successfully!");
      searchParams.delete("toast");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="px-8 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden py-16">
          <div className="relative text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent mb-4">
              All Events
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our exclusive collection of premium events and
              experiences
            </p>
          </div>
        </div>
        {/* Events list */}
        <Suspense
          fallback={
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mr-3"></div>
              <span className="text-gray-300">Loading all events...</span>
            </div>
          }
        >
          <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default EventsPage;
