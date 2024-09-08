import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Use this to get id from URL
import './AddReview.css';

import Cookies from "js-cookie";

function ReviewForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      id, 
      reviewText,
      rating,
      // add user id too
    };
   
    try {
      console.log(reviewData);
      const response = await fetch('http://localhost:3001/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log('Review submitted:', reviewData);
        setReviewText(''); 
        setRating(0);
        setHover(0);
        navigate(`/games/${id}`);
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-cont">
      
    <form onSubmit={handleSubmit}>
      <label htmlFor="review">Review:</label>
      <textarea
        id="review"
        value={reviewText}
        onChange={handleInputChange}
        placeholder="Write your review here..."
        required
      />
      <div className="star-rating">
        Rate:
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: 'none' }}
              />
              <span
                className={`ratestar ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            </label>
          );
        })}
      </div>
      <button type="submit" className='add-review'>Submit Review</button>
    </form>
    </div>
  );
}

export default ReviewForm;
