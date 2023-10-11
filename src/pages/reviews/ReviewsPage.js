import React, { useEffect, useState } from "react";
import ReviewCreateForm from "../../pages/reviews/ReviewCreateForm";
import { axiosReq } from "../../api/axiosDefaults";

const ReviewsPage = ({ profileId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axiosReq.get(`/reviews/?profile_id=${profileId}`);
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [profileId]);

  // ReviewsPage Structure
  return (
    <div>
      <h2>User Reviews</h2>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.owner}'s review</h3>
                <p>Rating: {review.rating}</p>
                <p>Content: {review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
          <hr />
          <h3>Write a Review</h3>
          {/* Render the ReviewCreateForm component */}
          <ReviewCreateForm profile_id={profileId} currentUser={currentUser} />
        </>
      )}
    </div>
  );
};

export default ReviewsPage;
