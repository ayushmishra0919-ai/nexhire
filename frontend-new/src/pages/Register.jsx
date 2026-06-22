import { useState } from "react";
import axios from "axios";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://nexhire-z5c2.onrender.com/auth/signup",
        {
          name,
          email,
          password,
          type: "recruiter",
          education: [],
          skills: [],
          rating: 0,
          resume: "",
          profile: "",
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful!");
    } catch (err) {
  console.log(err.response?.data);
  alert(JSON.stringify(err.response?.data));
}
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account 🚀</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;