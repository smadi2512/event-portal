import { useSubmit } from "react-router-dom";

function LogoutForm() {
  const submit = useSubmit();
  const handleLogout = () => {
    submit(null, { method: "POST", action: "/logout" });
  };

  return (
    <>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/20"
      >
        Logout
      </button>
    </>
  );
}

export default LogoutForm;
