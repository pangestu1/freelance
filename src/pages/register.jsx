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
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation password kudu lewih ti 6 character
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // cek email mun geus aya
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (existingUsers.some(user => user.email === formData.email)) {
        setError("Email already registered");
        return;
      }

      
      const newUser = {
        fullname: formData.fullname,
        occupation: formData.occupation,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      
      // Alert success
      alert("Registration successful! Please login.");
      
      // navigasi to login
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="register-container">
      <img src={background} alt="background" className="background" />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create New Account</h2>
        
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
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
        
        <button type="submit">Register Account</button>
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