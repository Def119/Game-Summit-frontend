import React from "react";
import { Typography, Grid } from "@mui/material";
import gameSummitImage1 from "../../../src/assets/1.png"; // Replace with your image paths and filenames
import gameSummitImage2 from "../../../src/assets/5.png"; // Replace with your image paths and filenames

const History = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Our History
      </Typography>
      <br />
      <Typography variant="body1" paragraph sx={{ fontSize: "1.4rem" }}>
        Game Summit began its journey in 2024 with a vision to unite gamers from
        around the globe. What started as a small community forum quickly grew
        into a comprehensive platform for gaming enthusiasts. Our founders,
        passionate gamers themselves, wanted to create a space where people
        could share their love for games, discover new titles, and connect with
        others who share their passion. Over the years, we've expanded our
        offerings to include in-depth reviews, industry news, and exclusive
        content. Today, Game Summit stands as a beacon for gamers, fostering a
        vibrant community and celebrating the ever-evolving world of gaming.
      </Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <img
            src={gameSummitImage1}
            alt="Game Summit 1"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "auto",
              borderRadius: "10%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={gameSummitImage2}
            alt="Game Summit 2"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "auto",
              borderRadius: "10%",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default History;
