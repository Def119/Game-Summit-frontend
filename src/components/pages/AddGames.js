import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddGames.css";

function AddGameForm() {
  const [gameName, setGameName] = useState("");
  const [category, setCategory] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [awards, setAwards] = useState("");
  const [description, setDescription] = useState("");
  const [introSentence, setIntroSentence] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [inGameCaptures, setInGameCaptures] = useState([]);
  
  const navigate = useNavigate();

  const categories = ["Action", "Adventure", "MMO RPG", "Shooter", "Strategy","Fantasy","Racing","Fighting"];
  const platformOptions = ["PC", "PlayStation", "Xbox", "Switch", "Mobile"];
  const awardOptions = ["None", "Game of the Year", "Best Art Direction", "Best Storyline", "Best Multiplayer"];

  const handlePlatformChange = (e) => {
    const value = e.target.value;
    if (platforms.includes(value)) {
      // If the platform is already selected, remove it
      setPlatforms(platforms.filter((platform) => platform !== value));
    } else {
      // If the platform is not selected, add it
      setPlatforms([...platforms, value]);
    }
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleInGameCapturesChange = (e) => {
    setInGameCaptures([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gameName", gameName);
    formData.append("category", category);
    formData.append("releaseDate", releaseDate);
    formData.append("platforms", JSON.stringify(platforms));
    formData.append("awards", awards);
    formData.append("description", description);
    formData.append("introSentence", introSentence);
    formData.append("ageRating", ageRating);

    if (coverPhoto) {
      formData.append("coverPhoto", coverPhoto);
    }
    

    inGameCaptures.forEach((capture) => {
      formData.append("inGameCaptures[]", capture);
    });

    try {
      const response = await fetch("http://localhost:3001/add-game", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Game added successfully!");
        navigate('/dash-board');
      } else {
        alert("Failed to add game. Please try again.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      alert("An error occurred while adding the game.");
    }
  };

  const handleClick = () => {
    navigate('/games/manage-games');
  };

  return (
    <div className="add-game-container">
      <button onClick={handleClick} className="submit-button">
          Manage Games
        </button>
        <hr className="seperator"/>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="gameName" className="gameName">Game Name:</label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Platforms:</label>
          <div className="platforms">
            {platformOptions.map((platform) => (
              <div key={platform}>
                <input
                  type="checkbox"
                  value={platform}
                  onChange={handlePlatformChange}
                />
                <label>{platform}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="awards">Awards:</label>
          <select
            id="awards"
            value={awards}
            onChange={(e) => setAwards(e.target.value)}
          >
            <option value="">Select Award</option>
            {awardOptions.map((award) => (
              <option key={award} value={award}>
                {award}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="introSentence">Intro Sentence:</label>
          <input
            type="text"
            id="introSentence"
            value={introSentence}
            onChange={(e) => setIntroSentence(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ageRating">Age Rating:</label>
          <input
            type="text"
            id="ageRating"
            value={ageRating}
            onChange={(e) => setAgeRating(e.target.value)}
            required
          />
        </div>


        {/* GET PHOTOS */}
        <div className="form-group">
          <label htmlFor="coverPhoto">Cover Photo:</label>
          <input
            type="file"
            id="coverPhoto"
            onChange={handleCoverPhotoChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inGameCaptures">In-Game Captures:</label>
          <input
            type="file"
            id="inGameCaptures"
            onChange={handleInGameCapturesChange}
            accept="image/*"
            multiple
            required
          />
        </div>


        <button type="submit" className="submit-button">
          Add Game
        </button>

       
      </form>
      
    </div>
  );
}

export default AddGameForm;
