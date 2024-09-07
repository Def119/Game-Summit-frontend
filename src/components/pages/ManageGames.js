import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ManageGames.css';

const ManageGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editGameData, setEditGameData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3001/games");
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleDeleteGame = async (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        const response = await fetch(`http://localhost:3001/games/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setGames(games.filter((game) => game._id !== id));
          alert("Game deleted successfully.");
        } else {
          alert("Failed to delete game.");
        }
      } catch (err) {
        console.error("Error deleting game:", err);
        alert("Failed to delete game.");
      }
    }
  };

  const handleEditGame = (game) => {
    setEditMode(game._id);
    setEditGameData(game);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editGameData),
      });

      if (response.ok) {
        const updatedGames = games.map((game) =>
          game._id === id ? editGameData : game
        );
        setGames(updatedGames);
        setEditMode(null);
        alert("Game updated successfully.");
      } else {
        alert("Failed to update game.");
      }
    } catch (err) {
      console.error("Error updating game:", err);
      alert("Failed to update game.");
    }
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div>Error loading games: {error}</div>;
  }

  return (
    <div className="admin-page">
      <h2>Manage Games</h2>
      <div className="games-list">
        {games.map((game) => (
          <div key={game._id} className="game-item">
            {editMode === game._id ? (
              <div className="edit-game">
                <input
                  type="text"
                  value={editGameData.gameName}
                  onChange={(e) =>
                    setEditGameData({ ...editGameData, gameName: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editGameData.userRating}
                  onChange={(e) =>
                    setEditGameData({ ...editGameData, userRating: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editGameData.category}
                  onChange={(e) =>
                    setEditGameData({ ...editGameData, category: e.target.value })
                  }
                />
                <button onClick={() => handleSaveEdit(game._id)}>
                  Save
                </button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </div>
            ) : (
              <div className="game-details">
                <h3>{game.gameName}</h3>
                <p>Rating: {game.userRating}</p>
                <p>Category: {game.category}</p>
                <button onClick={() => handleEditGame(game)}>Edit</button>
                <button onClick={() => handleDeleteGame(game._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGames;
