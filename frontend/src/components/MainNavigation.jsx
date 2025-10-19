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

          {/* Main Navigation on Desktop */}
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
          <div className="hidden md:flex items-center gap-4">
            {token && <LogoutForm />}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {token && (
              <div className="hidden sm:block">
                <LogoutForm />
              </div>
            )}
            <div className="relative">
              <input
                type="checkbox"
                id="mobile-menu-toggle"
                className="hidden peer"
              />
              <label
                htmlFor="mobile-menu-toggle"
                className="cursor-pointer text-gray-300 hover:text-[#d4af37] transition-colors duration-300 p-2 rounded-lg hover:bg-gray-800 block"
              >
                {/* Hamburger Icon */}
                <svg
                  className="w-6 h-6 peer-checked:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close Icon */}
                <svg
                  className="w-6 h-6 hidden peer-checked:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>

              {/* Main Navigation on Mobile */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-gradient-to-b from-gray-900 to-black border border-[#d4af37]/30 rounded-lg shadow-2xl opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300 transform scale-95 peer-checked:scale-100 z-50">
                <nav className="py-2">
                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `block font-medium transition-all duration-200 hover:text-[#d4af37] px-4 py-3 mx-2 rounded ${
                            isActive
                              ? "text-[#d4af37] bg-[#d4af37]/10 border-l-4 border-[#d4af37]"
                              : "text-gray-300"
                          }`
                        }
                        onClick={() =>
                          (document.getElementById(
                            "mobile-menu-toggle"
                          ).checked = false)
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
                          `block font-medium transition-all duration-200 hover:text-[#d4af37] px-4 py-3 mx-2 rounded ${
                            isActive
                              ? "text-[#d4af37] bg-[#d4af37]/10 border-l-4 border-[#d4af37]"
                              : "text-gray-300"
                          }`
                        }
                        onClick={() =>
                          (document.getElementById(
                            "mobile-menu-toggle"
                          ).checked = false)
                        }
                      >
                        Events
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/newsletter"
                        className={({ isActive }) =>
                          `block font-medium transition-all duration-200 hover:text-[#d4af37] px-4 py-3 mx-2 rounded ${
                            isActive
                              ? "text-[#d4af37] bg-[#d4af37]/10 border-l-4 border-[#d4af37]"
                              : "text-gray-300"
                          }`
                        }
                        onClick={() =>
                          (document.getElementById(
                            "mobile-menu-toggle"
                          ).checked = false)
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
                            `block font-medium transition-all duration-200 hover:text-[#d4af37] px-4 py-3 mx-2 rounded ${
                              isActive
                                ? "text-[#d4af37] bg-[#d4af37]/10 border-l-4 border-[#d4af37]"
                                : "text-gray-300"
                            }`
                          }
                          onClick={() =>
                            (document.getElementById(
                              "mobile-menu-toggle"
                            ).checked = false)
                          }
                        >
                          Login
                        </NavLink>
                      </li>
                    )}
                    {/* Mobile-only Logout */}
                    {token && (
                      <li className="border-t border-gray-700 pt-2 mt-2">
                        <div className="px-4 py-2">
                          <LogoutForm />
                        </div>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
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
