import { NavLink, useRouteLoaderData } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";
import LogoutForm from "./auth/LogoutForm";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-[#d4af37]/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
              Event Portal
            </h1>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-medium transition-all duration-300 hover:text-[#d4af37] ${
                      isActive
                        ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                        : "text-gray-300"
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `font-medium transition-all duration-300 hover:text-[#d4af37] ${
                      isActive
                        ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                        : "text-gray-300"
                    }`
                  }
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/newsletter"
                  className={({ isActive }) =>
                    `font-medium transition-all duration-300 hover:text-[#d4af37] ${
                      isActive
                        ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                        : "text-gray-300"
                    }`
                  }
                >
                  Newsletter
                </NavLink>
              </li>
              {!token && (
                <li>
                  <NavLink
                    to="/auth?mode=login"
                    className={({ isActive }) =>
                      `font-medium transition-all duration-300 hover:text-[#d4af37] ${
                        isActive
                          ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                          : "text-gray-300"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Logout */}
          <div className="flex items-center gap-4">
            {token && <LogoutForm />}
          </div>
        </div>

        {/* NewsletterSignup section */}
        <div className="border-t border-gray-700 pt-3 pb-2">
          <NewsletterSignup />
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
