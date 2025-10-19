import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";
import { Toaster } from "react-hot-toast";
const toastOptions = {
  position: "top-center",
  style: {
    background: "linear-gradient(135deg, #1f2937, #111827)",
    padding: "1.25rem 1.5rem",
    fontSize: "1rem",
    outerWidth: "30rem",
    color: "#f9fafb",
    border: "1px solid #d4af37",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(212, 175, 55, 0.2)",
    backdropFilter: "blur(10px)",
    transform: "scale(1.1)",
    lineHeight: 1.6,
  },
  success: {
    duration: 3000,
    iconTheme: {
      primary: "#d4af37",
      secondary: "#1f2937",
    },
  },
  error: {
    duration: 3000,
    iconTheme: {
      primary: "#ef4444",
      secondary: "#1f2937",
    },
  },
  loading: {
    duration: Infinity,
    iconTheme: {
      primary: "#d4af37",
      secondary: "#1f2937",
    },
  },
};

function RootLayout() {
  const token = useLoaderData(); //To get the token
  const submit = useSubmit();

  //To expire the token after one hour.
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { method: "POST", action: "/logout" });
      return;
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      //Trigger the logout form
      submit(null, { method: "POST", action: "/logout" });
    }, tokenDuration); //After one hour
  }, [token, submit]);

  return (
    <>
      <Toaster position="top-center" toastOptions={toastOptions} />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
