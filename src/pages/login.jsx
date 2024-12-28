// src/pages/login.jsx
import React, { useState } from "react";
import "./reset.css";
import "./login.css";
import background from "../assets/signup.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk menangani login bisa ditambahkan di sini
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container"> {/* Class untuk container login */}
      <img src={background} alt="background" className="background" />
      <form className="login-form" onSubmit={handleSubmit}> {/* Class untuk form login */}
        <h2>Login</h2>
        <div className="form-group"> {/* Class untuk grup input */}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group"> {/* Class untuk grup input */}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;