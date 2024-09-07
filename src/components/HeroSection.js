import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import lightHeroImage from "../assets/hero.jpg";
import darkHeroImage from "../assets/hero2.jpg";

function HeroSection() {
  const theme = useTheme();
  const heroImage =
    theme.palette.mode === "light" ? lightHeroImage : darkHeroImage;

  // Initialize state for name and countdown
  const [name, setName] = useState("Gamer");
  const [countdown, setCountdown] = useState(3661); // Initial countdown time in seconds (example: 1 hour, 1 minute, and 1 second)
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   // Decrease countdown every second
  //   const timer = setInterval(() => {
  //     setCountdown((prevCountdown) => prevCountdown - 1);
  //   }, 1000);

  //   // Update current time every second
  //   const timeInterval = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   // Clean up intervals on component unmount
  //   return () => {
  //     clearInterval(timer);
  //     clearInterval(timeInterval);
  //   };
  // }, []);

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return `GOOD MORNING ${name.toUpperCase()}!`;
    } else if (currentTime < 18) {
      return `GOOD AFTERNOON ${name.toUpperCase()}!`;
    } else {
      return `GOOD EVENING ${name.toUpperCase()}!`;
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  // Format current time as hh:mm:ss
  const formattedCurrentTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.text.primary,
      }}
    >
      <div className="hero-container">
        <h1>{getGreeting()}</h1>
        {/* <p>{formattedCurrentTime}</p> */}
        <br />
        {/* <TextField
          label="How Should We Call You?"
          variant="outlined"
          margin="normal"
          value={name}
          rows={4}
          onChange={handleNameChange}
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            sx: {
              color: "white",
              borderColor: "white",
              padding: "6px",
              fontSize: "1.2rem",
            },
          }}
        /> */}
        <center>
          <div className="hero-btns">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              EXPLORE
            </Button>
          </div>
        </center>
      </div>
    </Box>
  );
}

export default HeroSection;
