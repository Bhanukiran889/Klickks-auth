import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/dashboard")
    .then((res) => setUser(res.data.user))
    .catch(() => navigate("./login"));

  }, [navigate])

const handleLogout = async () => {
  await axios.post("/logout");
  navigate("/login");
}
  return (
    <>
    <div>
      {user ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="mb-6">You are logged in as <b>{user.email}</b></p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (<p>Loading...</p>)}
    </div>
    </>
  )
}

export default Dashboard
