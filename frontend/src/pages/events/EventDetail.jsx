import { Suspense } from 'react';
import {
  useRouteLoaderData,
  Await,
} from 'react-router-dom';

import EventItem from '../../components/events/EventItem';
import EventsList from '../../components/events/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8">
      {/* Event Item Section */}
      <div className="mb-12">
        <Suspense fallback={
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
            <p className="mt-4 text-gray-300">Loading event details...</p>
          </div>
        }>
          <Await resolve={event}>
            {(loadedEvent) => <EventItem event={loadedEvent} />}
          </Await>
        </Suspense>
      </div>

      {/* Related Events Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent mb-4">
            Related Events
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover more amazing events you might be interested in
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mr-3"></div>
            <span className="text-gray-300">Loading related events...</span>
          </div>
        }>
          <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default EventDetailPage;