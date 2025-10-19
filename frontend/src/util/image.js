// Handles backend image URLs with a fallback
export function getImageUrl(imagePath) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  if (!imagePath) {
    return "/images/placeholder-event.png"; // fallback if missing
  }

  // If image path already contains "http", just return it
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, prepend backend URL
  return `${BASE_URL}${imagePath}`;
}