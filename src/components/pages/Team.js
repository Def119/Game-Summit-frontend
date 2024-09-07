import React from "react";
import { Typography, Grid, Box } from "@mui/material";

const teamMembers = [
  { name: "Alice Johnson", image: "/images/alice.jpg" },
  { name: "Bob Smith", image: "/images/bob.jpg" },
  { name: "Catherine Lee", image: "/images/catherine.jpg" },
  { name: "David Brown", image: "/images/david.jpg" },
];

const Team = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Our Team
      </Typography>
      <br />
      <Typography variant="body1" paragraph sx={{ fontSize: "1.4rem" }}>
        Our team at Game Summit is composed of a diverse group of passionate
        gamers, creative developers, and dedicated professionals. Each member
        brings unique skills and a shared love for gaming, driving our mission
        to create an engaging and inclusive platform for gamers worldwide. From
        curating the latest gaming news and reviews to fostering a vibrant
        community, our team works tirelessly to ensure you have the best gaming
        experience. Meet the faces behind Game Summit, who are committed to
        exploring new gaming horizons, innovating within the industry, and
        building a community where every gamer feels at home.
      </Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              component="img"
              src={member.image}
              alt={member.name}
              sx={{
                width: "100%",
                borderRadius: "10%",
                marginBottom: "1rem",
              }}
            />
            <Typography variant="h6" align="center">
              {member.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
