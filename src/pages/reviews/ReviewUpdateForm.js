import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import styles from "../../styles/ReviewForm.module.css";

const ReviewUpdateForm = ({
  reviewId,
  content: initialContent,
  rating: initialRating,
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [rating, setRating] = useState(initialRating);
  const [isSaved, setIsSaved] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    const updatedReviewData = {
      content,
      rating,
    };

    const apiUrl = `https://djangorestframework-api-38c4a098777a.herokuapp.com/reviews/${reviewId}/`;

    try {
      const response = await axios.put(apiUrl, updatedReviewData);

      if (response.status === 200) {
        setIsSaved(true);
        // console.log("Review updated successfully!");
        onSave(); // Callback to show the review content after saving
      } else {
        // console.error("Review update failed:", response.statusText);
      }
    } catch (error) {
      // console.error("Error updating review:", error);
    }
  };

  useEffect(() => {
    if (isSaved) {
      // console.log("Displaying updated review data:", { content, rating });
    }
  }, [isSaved, content, rating]);

  // ReviewUpdateForm Structure
  return (
    <div className={styles["reviewUpdateForm"]}>
      {!isSaved ? (
        <>
          <div className={styles["reviewUpdateFormInfo"]}>
            <i className="fa-solid fa-circle-info"></i>
            <p>You are about to update your Review!</p>
          </div>
          <span className={styles["reviewUpdateFormRatingLabel"]}>Rating:</span>
          <Rating
            onClick={handleRating}
            initialValue={rating}
            size={15}
            fillColor="#f0d66b"
            emptyColor="#ccc"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles["reviewUpdateFormTextarea"]}
          />
          <Button
            onClick={handleSubmit}
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} ${styles["reviewUpdateFormButton"]}`}
          >
            Update
          </Button>
        </>
      ) : (
        <div className={styles["reviewUpdated"]}>
          <h3>Review Updated</h3>
          <p>Content: {content}</p>
          <p>Rating: {rating}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewUpdateForm;
