import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pic from "../../assets/1.png";
import RatingBox from "../RatingBox";
import UserReview from "../UserReview";
import "./Game.css";
import Slideshow from "../slideshow";
import ReviewList from "./ReviewList";

const Game = () => {
  const { id } = useParams(); // Get the game id from the URL
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Extract the game ID from the URL
        const urlParts = window.location.pathname.split('/');
        let gameId = urlParts[urlParts.length - 1];
       
        if (!gameId) {
          throw new Error('Game ID is missing from the URL');
        }

        // console.log('Fetching game data for ID:', gameId);
        const response = await fetch(`http://localhost:3001/games/${gameId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game data");
        }

        const data = await response.json();
        setGameData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error occurred:', err.message);
        setError(err.message);
        setLoading(false);       
      }
    };

    fetchGameData();
  }, [id]); // Fetch data whenever id changes


  const handleRateGameClick = () => {
    // alert(id);
    navigate(`/add-review/${id}`); // Navigate to add-review page with gameId
  };

  if (loading) {
    return <div className="LOAD">Loading game data...</div>;
  }

  if (error) {
    return <div className="LOAD">Error: {error}</div>;
  }

  if (!gameData) {
    return <div className="LOAD">
      <p>No game data found.</p>
      </div>;
  }

  return (
    <div className="game">
      <div className="overview">
        <div className="cover-container">
          <img src={gameData.coverPhoto || Pic} alt="" className="cover-image" />
        </div>
        <div className="box">
          <h2>{gameData.gameName}</h2>
          <h5>released on {gameData.releaseDate}</h5>
          <p>{gameData.introSentence}</p>
          <div>
            <RatingBox rating={gameData.userRating} votes={gameData.usersRated} />
            <p>{gameData.category}</p>
            <p>
              Available platforms - {gameData.platforms.join(" / ")}
            </p>
          </div>
          {/* <button className="btn" >Rate Game</button> */}
          <button className="btn" onClick={handleRateGameClick}>Rate Game</button>
        </div>
      </div>

      <hr style={{ marginTop: "50px" }} />

      <div className="section">
        <h3>Description</h3>
        <p>{gameData.description}</p>
      </div>

      <div style={{ margin: "20px" }}>
        <Slideshow images={gameData.inGameCaptures} className="section" />
      </div>
        <div className="section">
          <h3>Reviews</h3>
          <ReviewList gameId={id} />
          {/* <button className="btn-sec">Show more</button> */}
        </div>
       </div>
  );
};

export default Game;
