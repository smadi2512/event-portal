import { NavLink } from "react-router-dom";

function EventsNavigation() {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-black border-b border-gray-700 shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-3">
        <ul className="flex gap-8 justify-center">
          <li>
            <NavLink
              to="/events"
              end
              className={({ isActive }) =>
                `font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#d4af37] text-black shadow-lg"
                    : "text-gray-300 hover:text-[#d4af37] hover:bg-gray-700/50"
                }`
              }
            >
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                `font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#d4af37] text-black shadow-lg"
                    : "text-gray-300 hover:text-[#d4af37] hover:bg-gray-700/50"
                }`
              }
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
