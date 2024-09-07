import React from 'react';
import './RatingBox.css';
import { FaStar } from "react-icons/fa";


const RatingBox = ({ rating, votes }) => {
  return (
    <div className="imdb-rating">
      <div className="rating-value">
        <div style={{marginRight:"10px"}}><FaStar className="star-icon" size={40}/></div>
        
        <div>
          <span className="rating-number">{rating}</span>
          <span className="rating-max">/5</span>
          <div className="votes-count">{votes}</div>
        </div>
      </div>      
    </div>
  );
};

export default RatingBox;
