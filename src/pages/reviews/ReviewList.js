import React from "react";
import Card from "react-bootstrap/Card"; // Shoul apply cards to this componet!!!
import Review from "../../pages/reviews/Review";

const ReviewList = ({ reviews, currentUser }) => {
    return (
      <div>
        <h2>Reviews - Style later!</h2>
        {reviews.map((review) => (
          <Review key={review.id} {...review} currentUser={currentUser} />
        ))}
      </div>
    );
  };
  
  export default ReviewList;
