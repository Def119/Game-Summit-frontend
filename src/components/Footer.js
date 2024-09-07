import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import GamesIcon from "@mui/icons-material/Games";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.footer.main,
        padding: "16px",
        textAlign: "center",
        color: theme.palette.text.primary,
      }}
    >
      <div className="footer-container">
        <section className="social-media">
          <div className="social-media-wrap">
            <div className="footer-logo">
              <Link to="/" className="social-logo">
                <GamesIcon className="icon" />
                Game Summit
              </Link>
            </div>
            <small className="website-rights">Game Summit © 2024</small>
            <div className="social-icons">
              <Link
                className="social-icon-link facebook"
                to="#"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </Link>
              <Link
                className="social-icon-link instagram"
                to="#"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </Link>
              <Link
                className="social-icon-link youtube"
                to="#"
                aria-label="Youtube"
              >
                <i className="fab fa-youtube" />
              </Link>
              <Link
                className="social-icon-link twitter"
                to="#"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter" />
              </Link>
              <Link
                className="social-icon-link twitter"
                to="#"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Box>
  );
}

export default Footer;
