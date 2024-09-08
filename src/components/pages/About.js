import React from "react";
import { Container, Typography, Box, useTheme, Button } from "@mui/material";
import { NavLink, Routes, Route } from "react-router-dom";
import History from "./History";
import Team from "./Team";
import Values from "./Values";

const AboutUs = () => {
  const theme = useTheme();

  return (
    <div
      className="about"
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg" style={{ marginTop: "4.5rem" }}>
        <center>
          <Typography variant="h2" gutterBottom>
            About Us
          </Typography>
        </center>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.4rem" }}>
          Welcome to Game Summit, where passion meets play. At Game Summit,
          we're dedicated to creating a community-driven platform that
          celebrates the art, culture, and excitement of gaming. Whether you're
          exploring the latest AAA titles or diving into indie gems, our mission
          is to provide you with engaging content, insightful reviews, and a
          space to connect with like-minded gamers around the globe.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.4rem" }}>
          Our journey began with a simple idea: to build a hub where gamers of
          all levels and interests can come together to share their experiences
          and discover new adventures. From competitive esports to immersive
          single-player experiences, Game Summit is your go-to source for
          everything gaming-related. Join us as we explore the ever-evolving
          world of gaming, discover new horizons, and forge lasting connections
          in this exciting digital landscape.
        </Typography>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: "2rem" }}>
            Contact Information
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.2rem" }}>
            <strong>Phone:</strong> +94 712 345 789
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.2rem" }}>
            <strong>Email:</strong> info@gamesummit.com
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.2rem" }}>
            <strong>Address:</strong> 16/1, Uyana road, Moratuwa, Sri Lanka
          </Typography>
        </Box>
        <br />
        <Box mt={4}>
          <nav>
            <Button
              component={NavLink}
              to="history"
              activeClassName="active"
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              History
            </Button>
            <Button
              component={NavLink}
              to="team"
              activeClassName="active"
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              Team
            </Button>
            <Button
              component={NavLink}
              to="values"
              activeClassName="active"
              variant="outlined"
              color="primary"
            >
              Values
            </Button>
          </nav>
          <br />
          <br />
          <br />
          <Routes>
            <Route path="history" element={<History />} />
            <Route path="team" element={<Team />} />
            <Route path="values" element={<Values />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
};

export default AboutUs;
