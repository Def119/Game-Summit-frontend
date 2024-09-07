import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import valueImage1 from "../../../src/assets/3.png"; // Replace with your image paths and filenames
import valueImage2 from "../../../src/assets/5.png"; // Replace with your image paths and filenames
import valueImage3 from "../../../src/assets/6.png"; // Replace with your image paths and filenames

const Values = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Our Values
      </Typography>
      <br />
      <Typography variant="body1" paragraph sx={{ fontSize: "1.4rem" }}>
        At Game Summit, our core values embody inclusivity, passion, and
        integrity. We believe in fostering a community where every gamer feels
        welcomed and valued. Through dedication to excellence and innovation, we
        strive to provide insightful content and meaningful connections within
        the gaming world. Transparency and trust are fundamental in our
        interactions with our community and partners. We embrace diversity and
        celebrate the diverse perspectives that enrich our gaming experiences.
        Our commitment to sustainability guides our decisions, ensuring a
        positive impact on both our digital and global communities. Together, we
        elevate gaming as a platform for creativity, collaboration, and positive
        change.
      </Typography>
      <br />
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <img
            src={valueImage1}
            alt="Value 1"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "10%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src={valueImage2}
            alt="Value 2"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "10%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src={valueImage3}
            alt="Value 3"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "10%",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Values;
