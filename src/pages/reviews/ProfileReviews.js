import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card"; // remove or apply?
import Review from "../../pages/reviews/Review";

const ProfileReviews = ({ profileId, currentUser }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://djangorestframework-api-38c4a098777a.herokuapp.com/reviews/?profile=${profileId}`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (profileId) {
      fetchReviews();
    }
  }, [profileId]);

  return (
    <div>
      <h2>Reviews - Styling afterwards</h2>
      {reviews.map((review) => (
        <Review key={review.id} {...review} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default ProfileReviews;
