import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/dashboard") //  now automatically sends cookies
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post("/logout"); //  with cookies
    navigate("/login", { replace: true });
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
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
