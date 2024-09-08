import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Pic from "../../assets/1.png";
import RatingBox from "../RatingBox";
import UserReview from "../UserReview";
import "./Game.css";
import Slideshow from "../slideshow";
import ReviewList from "./ReviewList";

const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    setIsLoggedIn(!!token);

    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/games/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game data");
        }
        const data = await response.json();
        setGameData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error occurred:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    const checkUserReview = async () => {
      if (!token) return; // Skip if user is not logged in
      try {        
        const response = await fetch(`http://localhost:3001/reviews/exists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        // console.log(result);
        setHasReviewed(result.hasReviewed);
      } catch (err) {
        console.error("Error checking user review:", err);
      }
    };

    fetchGameData();
    if (isLoggedIn) {
      checkUserReview();
    }
  }, [id, token, isLoggedIn,hasReviewed]);

  const handleRateGameClick = () => {
    navigate(`/add-review/${id}`);
  };

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.ok) {
        alert("Review deleted successfully!");
        setHasReviewed(false);
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  if (loading) {
    return <div className="LOAD">Loading game data...</div>;
  }

  if (error) {
    return <div className="LOAD">Error: {error}</div>;
  }

  if (!gameData) {
    return <div className="LOAD"><p>No game data found.</p></div>;
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
            <p>Available platforms - {gameData.platforms.join(" / ")}</p>
          </div>

          {isLoggedIn && (
            !hasReviewed ? (
              <button className="btn" onClick={handleRateGameClick}>
                Rate Game
              </button>
            ) : (
              <button className="btn" onClick={handleDeleteReview}>
                Delete Review
              </button>
            )
          )}
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
      </div>
    </div>
  );
};

export default Game;