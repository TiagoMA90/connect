import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";
import { Rating } from "react-simple-star-rating";
import styles from "../../styles/ReviewForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const ReviewCreateForm = ({ profile_id, createReview, currentUser }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Authentication
    if (!currentUser) {
      setErrors(["You must be logged in to write a review."]);
      return;
    }

    // Validation - If the rating is 0 or the content is empty
    if (content.trim() === "") {
      setErrors([
        <div className={styles.errorMessage}>
          Please provide a rating and review content.
        </div>,
      ]);
      return;
    }

    const reviewData = {
      profile_id: profile_id,
      rating: rating,
      content: content,
    };

    // Call the createReview function (passed from the parent component)
    createReview(reviewData);

    // Close the form and display a success message
    setFormSubmitted(true);
    setRating(0);
    setContent("");
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  if (formSubmitted) {
    // Success message for Wall submission
    return (
      <Alert variant="secondary">
        You have successfully reviewed this profile.
      </Alert>
    );
  }

  // ReviewCreateForm Structure
  return (
    <div>
      {currentUser && ( // Only renders the button if user is Auth.
        <Button
          variant="secondary"
          onClick={toggleForm}
          aria-controls="review-form-collapse"
          aria-expanded={isFormOpen}
          style={{ width: "100%" }}
        >
          {isFormOpen ? "Close Review Form" : "Write a Review"}
        </Button>
      )}

      <Collapse in={isFormOpen}>
        <Form
          onSubmit={handleSubmit}
          className={styles["reviewCreateForm"]}
          id="review-form-collapse"
        >
          <Form.Group>
            {/* <Form.Label htmlFor="CreateReviewContent" srOnly>
              Review
            </Form.Label> - NOTE: Commented to remove 2 Label issues registered by WAVE Evaluation Tool*/}
            <Form.Control
              as="textarea"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="CreateReviewContent"
              aria-label="Review"
              placeholder="Write a review for this user profile..."
              style={{ backgroundColor: "#f8f8f8" }} // Inline styling for the form backgroundcolor
            />
          </Form.Group>
          {errors.map((error, index) => (
            <Alert variant="warning" key={index}>
              {error}
            </Alert>
          ))}
          <div className="d-flex justify-content-between align-items-center">
            <Rating onClick={handleRating} />
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              aria-label="Submit to Review"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Collapse>
    </div>
  );
};

export default ReviewCreateForm;
