import React from 'react';
import './reviewBox.css'; // Import the styles for the component

import { FaStar, FaUserCircle } from 'react-icons/fa';


const UserReview = ({ author, title, rating, thoughts, timeAgo }) => {
  // Helper to render stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="user-review">
      <div className="review-header">
      
      <FaUserCircle className="user-icon" />
      <p className="review-author">by {author} - <span className="review-time">{timeAgo}</span></p>

        <div className="review-rating">
          {renderStars()}
        </div>
      </div>
      <h4 className="review-title">{title}</h4>
      <p className="review-text">{thoughts}</p>
    </div>
  );
};

export default UserReview;
