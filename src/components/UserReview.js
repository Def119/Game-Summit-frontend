import React from 'react'
import './UserReview.css';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const UserReview = ({ author, title, rating, thoughts, timeAgo }) => {
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span key={i} className={i <= rating ? 'star filled' : 'star'}>
            <FaStar />
          </span>
        );
      }
      return stars;
    };
  
    return (
      <div className="user-review">
        <div className="review-header">
          <FaUserCircle className="user-icon" />
          <div className="review-info">
            <div className="author-info">
              <span className="author">Written by {author}</span>
              <span className="time-ago">{timeAgo}</span>
            </div>
            <div className="rating-info">
              <div className="star-rating">{renderStars(rating)}</div>
            </div>
          </div>
        </div>
        <div className="review-body">
          <p className="title">{title}</p>
          <p className="thoughts">{thoughts}</p>
        </div>
      </div>
    );
  };


export default UserReview



