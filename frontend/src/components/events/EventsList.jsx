import { Link } from "react-router-dom";
import { getImageUrl } from "../../util/image";

function EventsList({ events }) {
  return (
    <>
      {/* Events list */}
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list" aria-label="List of upcoming events">
        {events.map((event) => (
          <li
            key={event.id}
            className="group bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:transform hover:scale-105 hover:border-[#d4af37]/50"
          >
            <Link to={`/events/${event.id}`} className="block h-full">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#d4af37] text-black px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  View Details
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#d4af37] transition-colors duration-300">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <svg
                    className="w-4 h-4 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time className="text-sm font-medium">{event.date}</time>
                </div>

                <div className="w-12 h-1 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full mb-4 group-hover:w-16 transition-all duration-500"></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Available</span>
                  </div>
                  <div className="text-[#d4af37] transform transition-transform duration-300 group-hover:translate-x-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* fallback if no events found */}
      {events.length === 0 && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img className="h-40" src="favicon.svg" alt="Empty events"/>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Events Found
          </h3>
          <p className="text-gray-400">Check back later for new events</p>
        </div>
      )}
    </>
  );
}

export default EventsList;
