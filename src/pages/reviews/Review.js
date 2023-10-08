import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Rating } from "react-simple-star-rating";
import ReviewUpdateForm from "../../pages/reviews/ReviewUpdateForm";

const Review = (props) => {
  const { id, owner, updated_at, content, rating, currentUser } = props;
  const [isEditing, setIsEditing] = useState(false);

  const [isReviewVisible, setIsReviewVisible] = useState(true);

  const styles = { // remove this inline styling and create a ?.module.css!!!!!!!!!!!!!!!!
    owner: {
      fontWeight: "bold",
    },
    date: {
      color: "gray",
      fontSize: "12px",
    },
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // Hidess the review content when "Edit" is clicked
    setIsReviewVisible(false);
  };

  const handleSaveReview = () => {
    setIsEditing(false);
    // Show the review content after saving
    setIsReviewVisible(true);
  };

  return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          {isReviewVisible && (
            <>
              <span style={styles.owner}>{owner}'s Review</span>
              <span style={styles.date}>{updated_at}</span>
              <p>
                Rating:
                <Rating readonly initialValue={rating} size={25} />
              </p>
              <p>{content}</p>
            </>
          )}
          {isEditing ? (
            <ReviewUpdateForm
              reviewId={id}
              content={content}
              rating={rating}
              onSave={handleSaveReview} // Pass a callback to handle saving
            />
          ) : (
            // Conditionally render the "Edit" button only for the review owner
            currentUser && currentUser.username === owner && (
              <>
                <button onClick={handleEditClick}>Edit</button>
              </>
            )
          )}
        </Media.Body>
      </Media>
    </>
  );
};

export default Review;
