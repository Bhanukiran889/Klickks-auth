import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ServerNotice from "./components/ServerNotice"; // ✅ Cold start notice

function App() {
  const [serverCold, setServerCold] = useState(false);

  useEffect(() => {
    // Try pinging the backend root
    axios
      .get("https://your-backend.onrender.com")
      .catch(() => setServerCold(true));

    // Hide after some time (45s)
    const timer = setTimeout(() => setServerCold(false), 45000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {serverCold && <ServerNotice />} {/* ✅ Show cold start notice */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
