// src/pages/Login.jsx
import React, { useState } from "react";
import "./register.css";
import "./reset.css"
import background from "../assets/signup.png"

const Login = () => {
  const [fullname, setFullname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    // Tambahkan logika autentikasi di sini
  };

  return ( 

    <div className="login-container">
      <img src={background} alt="background" className ="background" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign UP Account!</h2>
        <div className="form-group">
          <label htmlFor="email">Full Name</label>
          <input
            type="fullname"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Occupation</label>
          <input
            type="password"
            id="password"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Email Addres</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Contiunue Sign Up</button>
        <br /> <br />
        <p>Already have account? <a href="">Sign in</a></p>
      </form>
    </div>
  );
};

export default Login;
