import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import lightPatt from "../assets/patt2.jpg";
import darkPatt from "../assets/patt.jpg";

function Cards() {
  const theme = useTheme();
  const backgroundImage = theme.palette.mode === "light" ? lightPatt : darkPatt;

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.primary,
      }}
    >
      <div className="cards" id="cards">
        <br />
        <h1>Top Games of the Week</h1>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem
                src="images/ac.jpg"
                text="Stealth, history, and adventure define Assassin's Creed."
                label="Action"
                path="#"
              />
              <CardItem
                src="images/val.jpg"
                text="Precision shooting, strategic team play: Valorant"
                label="Shooting"
                path="#"
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src="images/cod.jpg"
                text="Intense combat, teamwork, and strategy: Call of Duty"
                label="Shooting"
                path="#"
              />
              <CardItem
                src="images/wdl.png"
                text="Dynamic hacking, and tactical recruitment: Watch Dogs Legion"
                label="RPG"
                path="#"
              />
              <CardItem
                src="images/cyberpunk.jpg"
                text="Futuristic chaos, neon lights, cybernetic: Cyberpunk."
                label="Action"
                path="#"
              />
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Cards;
