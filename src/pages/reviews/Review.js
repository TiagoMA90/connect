import React, { useState, useEffect } from "react";
import Media from "react-bootstrap/Media";
import { Rating } from "react-simple-star-rating";
import ReviewUpdateForm from "../../pages/reviews/ReviewUpdateForm";
import styles from "../../styles/Review.module.css";
import Avatar from "../../components/Avatar";

const Review = (props) => {
  const { id, owner, updated_at, content, rating, currentUser, profile_image } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isReviewVisible, setIsReviewVisible] = useState(true);
  const [originalContent, setOriginalContent] = useState(content);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setIsReviewVisible(false);
  };

  const handleSaveReview = (updatedContent) => {
    setIsEditing(false);
    setIsReviewVisible(true);
    setUpdatedContent(updatedContent);
    setUpdateMessage("Review updated!");
  };

  useEffect(() => {
    // When the `content` prop changes, update the `originalContent`
    setOriginalContent(content);
  }, [content]);

  return (
    <Media>
      <Media.Body className={`align-self-center ${styles.reviewContainer}`}>
        {isReviewVisible && (
          <Media>
            <div className={`align-self-start mr-2 ${styles.profileImageContainer}`}>
              <div className={styles.centeredAvatar}>
                <Avatar src={profile_image} />
              </div>
            </div>
            <div className={`align-self-center ${styles.reviewContent}`}>
              <div className={styles.owner}>{owner}</div>
              <div className={styles.date}>{updated_at}</div>
              <div className="d-flex align-items-center">
                <span>Rating: </span>
                <Rating readonly initialValue={rating} size={15} />
                {currentUser && currentUser.username === owner && (
                  <button
                    className={`${styles.editButton} ${styles.editButtonDate}`}
                    onClick={handleEditClick}
                  >
                    <i className="fa-solid fa-pen-to-square fa-sm"></i>
                    <span className="sr-only">Edit</span>
                  </button>
                )}
              </div>
            </div>
          </Media>
        )}
        {isEditing ? (
          <ReviewUpdateForm
            reviewId={id}
            content={originalContent}  // Passes the originalContent for editing
            rating={rating}
            onSave={handleSaveReview}
          />
        ) : (
          <>
            <hr />
            <p>{originalContent}</p>  {/* Displays the originalContent */}
            {updateMessage && (
              <div className="alert alert-secondary text-center" role="alert">
                {updateMessage}
              </div>
            )}
            {updatedContent && <p>Updated Review: {updatedContent}</p>}
          </>
        )}
      </Media.Body>
    </Media>
  );
};

export default Review;
