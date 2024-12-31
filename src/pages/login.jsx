// src/pages/login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reset.css";
import "./login.css";
import background from "../assets/signup.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/dashboard");

        console.log("Login berhasil:", response.data);
      }
    } catch (error) {
      console.error("Error detail:", error.response);
      setError(
        error.response?.data?.message || "Username atau password salah!"
      );
    } finally {
      setIsLoading(false);
    }

    console.log("Username:", username);
    console.log("Password:", password);
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <img src={background} alt="background" className="background" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p>
          Dont have an account?{" "}
          <a href="/register" onClick={navigateToRegister}>
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
