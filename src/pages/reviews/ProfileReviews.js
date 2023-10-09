import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "../../pages/reviews/Review";
import styles from "../../styles/ProfileReviews.module.css";

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
    <div className={styles.reviewContainer}>
      <p className={styles.centerText}>Reviews wall</p>
      <hr className={styles.hr} />
      {reviews.length === 0 ? (
        <p className={styles.centerText}>No one has reviewed this user so far</p>
      ) : (
        reviews.map((review) => (
          <div className={styles.review} key={review.id}>
            <Review {...review} currentUser={currentUser} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileReviews;
