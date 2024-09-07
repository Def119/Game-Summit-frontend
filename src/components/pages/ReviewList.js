import React, { useState, useEffect } from 'react';
import UserReview from './reviewBox'; // Assuming you already have this component for displaying each review

const ReviewList = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const titles = ["Bad :/ ", "Fine :|" , "Good :)" , "Great ;) ", "Fantastic XD"]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        alert(gameId);
        const response = await fetch(`http://localhost:3001/reviews/${gameId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    if (gameId) {
      fetchReviews(); // Fetch reviews if gameId is available
    }
  }, [gameId]);

  if (loading) {
    return <div className='centered-message'>Loading reviews...</div>;
  }

  if (error) {
    return <div className='centered-message'>Error loading reviews: {error}</div>;
  }

  if (reviews.length === 0) {
    return <div className='centered-message'>No reviews available for this game.</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <UserReview
          key={review._id}
          author={review.author || 'Anonymous'}
          title={ titles[review.rating-1]|| 'Untitled'}
          rating={review.rating}
          thoughts={review.reviewText}
          timeAgo={new Date(review.createdAt).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default ReviewList;
