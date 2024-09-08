import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Login.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { dark } from "@mui/material/styles/createPalette";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement  authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:3001/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        Cookies.set("moderator", data.moderator, data.admin, { expires: 7 }); 
        Cookies.set("admin", data.admin, { expires: 7 }); 
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
        <button type="submit" className="login-button" style={containerStyle}>
          Login
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
