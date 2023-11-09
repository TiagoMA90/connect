import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Review from "../../pages/reviews/Review";
import styles from "../../styles/ProfileReviews.module.css";
import { Collapse } from "react-bootstrap";

const ProfileReviews = ({ profileId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://djangorestframework-api-38c4a098777a.herokuapp.com/reviews/?profile=${profileId}`,
      );
      setReviews(response.data.results);
    } catch (error) {
      // Handle the error here
    }
  }, [profileId]);

  useEffect(() => {
    // Fetch reviews initially
    fetchReviews();

    // Fetch new reviews every 1 second
    const intervalId = setInterval(fetchReviews, 1000); // set the millisecods = 1 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchReviews]);

  // Inline styling - Scroll Bar (no module.css)
  const scrollableReviewsStyle = {
    maxHeight: "300px",
    overflowY: "auto",
  };

  // Toggle Collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // ProfileReviews Structure
  return (
    <div className={styles.reviewContainer}>
      <div
        className="text-center"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        <p>
          <i className="fa-solid fa-star-half-stroke fa-lg"></i> Reviews Wall
        </p>
      </div>
      <hr className={styles.hr} />
      <Collapse in={!isCollapsed}>
        <div style={scrollableReviewsStyle}>
          {reviews.length === 0 ? (
            <p className={styles.centerText}>
              No one has reviewed this user so far...
            </p>
          ) : (
            reviews.map((review) => (
              <div className={styles.review} key={review.id}>
                <Review {...review} currentUser={currentUser} />
              </div>
            ))
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default ProfileReviews;
