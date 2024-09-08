import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import GamesIcon from "@mui/icons-material/Games";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useThemeContext } from "./ThemeContext";
import { Button } from "./Button";
import { LogOutButton } from "./LogoutButton";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function Navbar() {
  const { toggleTheme } = useThemeContext();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(window.innerWidth > 960);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick((prev) => !prev);
  const closeMobileMenu = () => setClick(false);

  const handleResize = useCallback(() => {
    setButton(window.innerWidth > 960);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsModerator(false);
    console.log("User logged out");
    navigate("/"); // Redirect to home page after logout
  };

  const checkAuthStatus = useCallback(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decodedToken.admin);
        setIsModerator(decodedToken.moderator);
      } catch (error) {
        console.error("Failed to decode token", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsModerator(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsModerator(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    checkAuthStatus();

    // Set up an interval to periodically check auth status
    const authCheckInterval = setInterval(checkAuthStatus, 60000); // Check every minute

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(authCheckInterval);
    };
  }, [handleResize, checkAuthStatus]);

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <GamesIcon className="icon" />
          Game Summit
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/games" className="nav-links" onClick={closeMobileMenu}>
              Games
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/articles" className="nav-links" onClick={closeMobileMenu}>
              Articles
            </Link>
          </li>

          {/* Display Dashboard only for Admins or Moderators */}
          {(isAdmin || isModerator) && (
            <li className="nav-item">
              <Link to="/dash-board" className="nav-links" onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
          )}

          {button && (
            isLoggedIn ? (
              <LogOutButton onClick={handleLogout} buttonStyle="btn--outline">
                Log Out
              </LogOutButton>
            ) : (
              <Button onClick={handleLogin} buttonStyle="btn--outline">
                Log In
              </Button>
            )
          )}

          <li className="switch">
            <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} />}
                onClick={toggleTheme}
              />
            </FormGroup>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;