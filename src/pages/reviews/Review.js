import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Rating } from "react-simple-star-rating";
import ReviewUpdateForm from "../../pages/reviews/ReviewUpdateForm";
import styles from "../../styles/Review.module.css";

const Review = (props) => {
  const { id, owner, updated_at, content, rating, currentUser } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsReviewVisible(false);
  };

  const handleSaveReview = () => {
    setIsEditing(false);
    setIsReviewVisible(true);
  };

  // Review Structure
  return (
    <Media>
      <Media.Body className={`align-self-center ml-2 ${styles.reviewContainer}`}>
        {isReviewVisible && (
          <>
            <span className={styles.owner}>{owner}'s Review</span>
            <span className={`${styles.date} ${styles.editDate}`}> • {updated_at}</span>
            <div className="d-flex align-items-center">
              <span>Rating: </span>
              <Rating readonly initialValue={rating} size={15} /> {/* Star rating */}
              {currentUser && currentUser.username === owner && (
                <button className={`${styles.editButton} ${styles.editButtonDate}`} onClick={handleEditClick}>
                  <i className="fa-solid fa-pen-to-square fa-sm"></i>
                </button>
              )}
            </div>
            <hr />
            <p>{content}</p>
          </>
        )}
        {isEditing ? (
          <ReviewUpdateForm
            reviewId={id}
            content={content}
            rating={rating}
            onSave={handleSaveReview}
          />
        ) : null}
      </Media.Body>
    </Media>
  );
};

export default Review;
