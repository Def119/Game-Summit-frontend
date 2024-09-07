import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "./ModeratorList.css";

function ModeratorList() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [moderators, setModerators] = useState([]);

  const navigate = useNavigate();

  const addModerator = async (e) => {
    e.preventDefault();
    
    const newModerator = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3001/add-moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModerator),
      });

      if (response.ok) {
        const result = await response.json();
        setModerators([...moderators, { id: result.insertedId, name }]);
        alert("Moderator added successfully!");
        // Clear the form
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Failed to add moderator. Please try again.");
      }
    } catch (error) {
      console.error("Error adding moderator:", error);
      alert("An error occurred while adding the moderator.");
    }
  };

  useEffect(() => {
    // Fetch the moderators from the backend when the component mounts
    const fetchModerators = async () => {
      try {
        const response = await fetch("http://localhost:3001/moderators");
        if (response.ok) {
          const data = await response.json();
          setModerators(data);
        } else {
          alert("Failed to load moderators.");
        }
      } catch (error) {
        console.error("Error fetching moderators:", error);
        alert("An error occurred while loading moderators.");
      }
    };

    fetchModerators();
  }, []);

  //delete selected moderator from the collection and update the mod list
  const removeModerator = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/moderators/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // If the deletion was successful, update the local state to remove the moderator from the list
        setModerators(moderators.filter((moderator) => moderator._id !== id));
        alert("Moderator removed successfully.");
      } else {
        alert("Failed to remove moderator. Please try again.");
      }
    } catch (error) {
      console.error("Error removing moderator:", error);
      alert("An error occurred while removing the moderator.");
    }
  };
  

  // Function to handle navigation to the dashboard
  const goToDashboard = () => {
    navigate("/dash-board");
  };

  return (
    <div className="moderator-list-container">
      {/* Button to navigate to the dashboard */}
      <div className="button-container">
      <button className="add-button" onClick={goToDashboard}>
        Go to Dashboard
      </button>
      </div>
      <h2>Moderator List</h2>
      <ul className="moderator-list">
        {moderators.map((moderator) => (
          <li key={moderator.id} className="moderator-list-item">
            <span>{moderator.name}</span>
            <button
              className="remove-button"
              onClick={() => removeModerator(moderator._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Add New Moderator</h3>
      <form className="moderator-form" onSubmit={addModerator}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
        <button type="submit" className="add-button">
          Add New Moderator
        </button>
        </div>
      </form>
    </div>
  );
}

export default ModeratorList;
