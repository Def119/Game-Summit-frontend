import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Login.css";
import { dark } from "@mui/material/styles/createPalette";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement  authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);
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
