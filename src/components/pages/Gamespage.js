import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./game-reviews.css";
import { useTheme } from "@emotion/react";

const categories = [
  "Action",
  "Shooter",
  "Fantasy",
  "Racing",

  "Sports",
  "All",
  "Strategy",
  "MMO RPG",
  "Fighting",
  "Adventure"
];

const GamesPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchGames = async (term = "") => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/games?q=${term}`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const gamesData = await response.json();
      setFilteredGames(gamesData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(); // Fetch all games initially
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGames(searchTerm); // Fetch games based on the search term
  };

  const filterGames = () => {
    let filtered = filteredGames;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((game) => game.category === selectedCategory);
    }

    return filtered;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // ##########
  const handleClick = (gameId) => {
    // console.log("Selected Game ID:", gameId); // Check the ID here
    navigate(`/games/${gameId}`); // Navigate to the game information page with the game id
  };

  const filteredResults = filterGames();

  if (loading) {
    return <div>Loading games...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="games-page">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Games"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <div className="filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="games-view">
        <div className="games-container">
          {filteredResults.length > 0 ? (
            filteredResults.map((game) => (
              <div
                key={game._id} 
                className="game-card"
                onClick={() => handleClick(game._id)}
              >
                <img
                  src={game.coverPhoto} 
                  alt={game.gameName} 
                  className="game-image"
                />
                <div className="game-info">
                  <h3 className="game-title">{game.gameName}</h3>
                  <p className="game-rating">Rating: {game.userRating}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No games available</p>
              <h5>try Searching with different Game Title or recheck Category</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
