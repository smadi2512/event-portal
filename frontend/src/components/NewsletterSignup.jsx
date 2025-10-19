import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import toast from "react-hot-toast";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const inputRef = useRef(null);

  useEffect(() => {
    if (state === "idle" && data && data.status === "success") {
      toast.success(
        `Thanks, ${data.email}!
        🎉 You're now subscribed to event updates.`
      );
      inputRef.current.value = "";
    }
  }, [data, state]);

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm font-medium hidden md:block">
          Newsletter:
        </span>

        <fetcher.Form
          method="post"
          action="/newsletter"
          className="flex gap-2 items-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email..."
            aria-label="Sign up for newsletter"
            className="bg-gray-700 border border-gray-600 text-white rounded-full px-4 py-1 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all duration-300 placeholder-gray-400 w-40 md:w-48"
            required
            ref={inputRef}
          />

          <button
            type="submit"
            disabled={state === "submitting"}
            className="cursor-pointer bg-[#d4af37] text-black font-medium px-3 py-1 rounded-full hover:bg-[#f4d03f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
          >
            {state === "submitting" ? (
              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-3 h-3"
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
            )}
            {state === "submitting" ? "" : "Join"}
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}

export default NewsletterSignup;
