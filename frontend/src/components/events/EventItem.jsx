import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { getImageUrl } from "../../util/image";
import { useState } from "react";
import ConfirmModal from "../UI/ConfirmModal";

function EventItem({ event }) {
  const submit = useSubmit();
  const token = useRouteLoaderData("root");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onConfirm = async () => {
    submit(null, { method: "delete" });
    setOpenConfirmModal(false);
  };

  const onCancel = () => setOpenConfirmModal(false);

  function deleteHandler() {
    setOpenConfirmModal(true);
  }

  {/* fallback if event is not found */}
  if (!event) {
    return (
      <article className="group bg-gradient-to-br from-gray-800 to-black shadow-2xl rounded-3xl p-8 border border-gray-700 max-w-2xl mx-auto">
        <div className="text-center text-gray-400 py-8">
          <p>Event information is not available</p>
        </div>
      </article>
    );
  }

  return (
    <>
      {token && (
        <ConfirmModal
          isOpen={openConfirmModal}
          onConfirm={onConfirm}
          onCancel={onCancel}
          message="Are you sure you want to delete this event? This action cannot be undone."
        />
      )}
      {/* Event Item card */}
      <article className="group bg-gradient-to-br from-gray-800 to-black shadow-2xl rounded-3xl p-8 border border-gray-700 max-w-2xl mx-auto transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:border-[#d4af37]/50">
        {/* Upper card */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <img
            src={getImageUrl(event.image)}
            alt={event?.title || "Event Image"}
            className="w-full h-72 object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4 bg-[#d4af37] text-black px-4 py-2 rounded-full shadow-lg font-semibold">
            <time className="text-sm">{event?.date || "TBA"}</time>
          </div>
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-[#d4af37] px-3 py-1 rounded-full text-sm font-medium border border-[#d4af37]/30">
            {event?.type || "Event"}
          </div>
        </div>
        {/* Lower card  */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
            {event?.title || "Untitled Event"}
          </h1>
          <p className="text-gray-300 leading-relaxed text-lg">
            {event?.description || "No description available"}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
              <span>Active Event</span>
            </div>
            <div className="flex items-center gap-2">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{event?.location || "Main Hall"}</span>
            </div>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full group-hover:w-24 transition-all duration-500"></div>
        </div>

        {/* Event Items actions */}
        {token && (
          <menu className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
            <Link
              to="edit"
              className="px-6 py-3 rounded-xl border-2 border-[#d4af37] text-[#d4af37] font-semibold hover:bg-[#d4af37] hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#d4af37]/20 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </Link>
            <button
              onClick={deleteHandler}
              className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-500/20 flex items-center gap-2 border border-red-500/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </menu>
        )}
      </article>
    </>
  );
}

export default EventItem;
