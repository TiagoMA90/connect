import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";

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
        console.log("Review updated successfully!");
        onSave(); // Callback to show the review content after saving
      } else {
        console.error("Review update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  useEffect(() => {
    if (isSaved) {
      console.log("Displaying updated review data:", { content, rating });
    }
  }, [isSaved, content, rating]);

  // ReviewUpdateForm Structure
  return (
    <div
      className="review-update-form"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        backgroundColor: "#f7f7f7",
        borderRadius: "2px",
      }}
    >
      {!isSaved ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="fa-solid fa-circle-info"></i> 
            <p>You are about to update your Review!</p>
          </div>
          <span>Rating:</span>
          <Rating
            onClick={handleRating}
            initialValue={rating}
            size={15} // Adjust the size of the stars (optional temporary)
            fillColor="#f0d66b" // Change the fill color of the stars (optional)
            emptyColor="#ccc" // Change the empty color of the stars (optional)
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "2px",
              boxShadow: "inset 0 2px 4px 1px #0000001a",
            }}
          />
          <Button
            onClick={handleSubmit}
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
          >
            Update
          </Button>
        </>
      ) : (
        <>
          <h3>Review Updated</h3>
          <p>Content: {content}</p>
          <p>Rating: {rating}</p>
        </>
      )}
    </div>
  );
};

export default ReviewUpdateForm;
