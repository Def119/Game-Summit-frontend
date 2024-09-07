import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Mangame.css'; // You can style accordingly

// Arrays for categories, platforms, and awards
const platforms = ["PC", "PlayStation", "Xbox", "Switch", "Mobile"];
const awards = ["None", "Game of the Year", "Best Art Direction", "Best Storyline", "Best Multiplayer"];

const ManGame = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch games by search term
  const fetchGames = async () => {
    try {
      const response = await fetch(`http://localhost:3001/games?q=${searchTerm}`);
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchGames();
  }, [searchTerm]);

  // Fetch selected game data when clicked
  const fetchGameData = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3001/games/${gameId}`);
      if (!response.ok) throw new Error('Failed to fetch game data');
      const data = await response.json();
      setSelectedGame(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setSelectedGame({ ...selectedGame, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the game
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/games/${selectedGame._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedGame),
      });
      if (!response.ok) throw new Error('Failed to update game');
      alert('Game updated successfully!');
      navigate(`/dash-board`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle game deletion
  const handleDelete = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3001/games/${gameId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete game');
      alert('Game deleted successfully!');
      setGames(games.filter(game => game._id !== gameId));
      navigate(`/dash-board`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin - Manage Games</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for games by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Search Results */}
      <div className="game-list">
        {games.length > 0 ? (
          games.map(game => (
            <div key={game._id} onClick={() => fetchGameData(game._id)} className="game-list-item">
              <p>{game.gameName} (Rating: {game.userRating})</p>
            </div>
          ))
        ) : (
          <p>No games found</p>
        )}
      </div>

      {/* Game Edit Form */}
      {selectedGame && (
        <div className="edit-form">
          <h2>Edit Game</h2>

          {/* Game Name */}
          <label className="form-label">Game Name:</label>
          <input
            type="text"
            name="gameName"
            value={selectedGame.gameName}
            onChange={handleInputChange}
            className="search-input"
          />

        

          {/* Platforms as checkboxes */}
          <div>
            <label className="form-label">Platforms:</label>
            {platforms.map(platform => (
              <label key={platform}>
                <input
                  type="checkbox"
                  name="platforms"
                  value={platform}
                  checked={selectedGame.platforms.includes(platform)}
                  onChange={e => {
                    const updatedPlatforms = [...selectedGame.platforms];
                    if (e.target.checked) updatedPlatforms.push(platform);
                    else updatedPlatforms.splice(updatedPlatforms.indexOf(platform), 1);
                    setSelectedGame({ ...selectedGame, platforms: updatedPlatforms });
                  }}
                  className="checkbox"
                />
                {platform}
              </label>
            ))}
          </div>

          {/* Awards */}
          <div>
            <label className="form-label">Awards:</label>
            <select
              name="awards"
              value={selectedGame.awards || ''}
              onChange={handleInputChange}
              className="select-box"
            >
              <option value="">Select Award</option>
              {awards.map(award => (
                <option key={award} value={award}>
                  {award}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description:</label>
            <textarea
              name="description"
              value={selectedGame.description}
              onChange={handleInputChange}
              className="textarea"
            />
          </div>

          {/* Intro Sentence */}
          <div>
            <label className="form-label">Intro Sentence:</label>
            <textarea
              name="introSentence"
              value={selectedGame.introSentence}
              onChange={handleInputChange}
              className="textarea"
            />
          </div>

          {/* Update and Delete Buttons */}
          <button onClick={handleUpdate} className="update_Button">
            Update Game
          </button>
          <button onClick={() => handleDelete(selectedGame._id)} className="delete_Button">
            Delete Game
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ManGame;
