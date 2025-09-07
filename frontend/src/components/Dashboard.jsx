import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/dashboard", { withCredentials: true }) // include cookies
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await axios.post("/logout", {}, { withCredentials: true });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="mb-6">
            You are logged in as <b>{user.email}</b>
          </p>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`w-full py-2 rounded-lg transition ${
              loggingOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {loggingOut ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Logging out...
              </span>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
