import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import "./reset.css";
import background from "../assets/signup.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    occupation: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Kirim data ke API
      const response = await fetch("http://localhost:5000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login"); // Navigasi ke halaman login setelah registrasi berhasil
      } else {
        setError(data.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const navigateTouploadAvatar = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="register-container">
      <img src={background} alt="background" className="background" />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create New Account</h2>
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          onSubmit={navigateTouploadAvatar}
        >
          Register Account
        </button>
        <br /> <br />
        <p>
          Already have an account?{" "}
          <a href="/login" onClick={navigateToLogin}>
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
