import React, { useState } from "react";
import axios from "axios";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { email, password }, { withCredentials: true });
      setMsg(res.data.message);
      history.push("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default Register;
