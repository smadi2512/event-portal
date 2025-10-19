import { useState } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { getImageUrl } from "../../util/image";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const [previewImage, setPreviewImage] = useState(
    event?.image ? getImageUrl(event.image) : null
  );

  function cancelHandler() {
    navigate("..");
  }

  function imageChangeHandler(event) {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl hover:border-[#d4af37]/30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
              {method === "PATCH"
                ? `Edit ${event.title} Event`
                : "Create New Event"}
            </h1>
            <p className="text-gray-400 mt-2">
              {method === "PATCH"
                ? "Update your event details"
                : "Fill in the details to create a new event"}
            </p>
          </div>
          {/* Event Form */}
          <Form
            method={method}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {data && data.errors && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl">
                <ul className="list-disc list-inside space-y-1">
                  {Object.values(data.errors).map((err) => (
                    <li key={err} className="text-sm">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Event title */}
            <div>
              <label
                htmlFor="title"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Event Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                defaultValue={event ? event.title : ""}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500"
                placeholder="Enter event title"
              />
            </div>
            {/* Event image */}
            <div>
              <label
                htmlFor="image"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                {previewImage ? "Event Image" : "Upload Event Image"}
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt={event?.title}
                  className="w-full h-72 object-cover rounded-xl py-3"
                />
              )}
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                required={method === "POST"}
                onChange={imageChangeHandler}
                className="cursor-pointer w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500"
              />
            </div>
            {/* Event date */}
            <div>
              <label
                htmlFor="date"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Event Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                required
                defaultValue={event ? event.date : ""}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300"
              />
            </div>
            {/* Event location */}
             <div>
              <label
                htmlFor="location"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Event Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                required
                defaultValue={event ? event.location : ""}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500"
                placeholder="Enter event location"
              />
            </div>
            {/* Event description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                defaultValue={event ? event.description : ""}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500 resize-vertical"
                placeholder="Describe your event..."
              />
            </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={cancelHandler}
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-500 hover:text-white hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:from-[#f4d03f] hover:to-[#d4af37] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  "Save Event"
                )}
              </button>
            </div>
          </Form>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="w-16 h-1 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
