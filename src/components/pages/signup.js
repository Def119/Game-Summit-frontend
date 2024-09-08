import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie"; // Import js-cookie
import "./Login.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Send data to backend
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      // Process the response
      const data = await response.json();
      if (response.ok) {
        console.log("User signed up successfully:", data);
        
        // Save the JWT token in cookies
        Cookies.set("token", data.token, { expires: 7 }); // Set cookie with 7-day expiry

        // Navigate to home page or dashboard
        navigate("/");
      } else {
        console.error("Error signing up:", data.message);
        alert(data.message || "Error signing up");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  let textColor = null;
  if (theme.palette.mode === "dark") {
    textColor = "white";
  }

  const containerStyle = {
    border: `2px solid ${theme.palette.border.main}`,
    color: textColor,
  };

  return (
    <div className="login-container" style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" style={containerStyle}>
          Sign Up
        </button>
      </form>
      <p className="signup-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignUp;
