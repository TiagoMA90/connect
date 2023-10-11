import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import btnStyles from "../../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Rating } from "react-simple-star-rating";
import styles from '../../styles/ReviewForm.module.css';

const ReviewCreateForm = ({ profile_id, createReview, currentUser }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is authenticated
    if (!currentUser) {
      setErrors(["You must be logged in to write a review."]);
      return;
    }

    // Validate
    if (rating === 0 || content.trim() === "") {
      setErrors(["Please provide a rating and review content."]);
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

  if (formSubmitted) {
    return (
      <Alert variant="secondary">
        You have successfully reviewed this profile.
      </Alert>
    );
  }

  if (!currentUser) {
    return null;
  }

  // ReviewCreateForm Structure
  return (
    <Form onSubmit={handleSubmit} className={styles['review-create-form']}>
      <Form.Group>
        <Form.Label className={styles['review-form-label']}>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      {errors.map((error, index) => (
        <Alert variant="warning" key={index}>
          {error}
        </Alert>
      ))}
      <div className="d-flex justify-content-between align-items-center">
        <Rating onClick={handleRating} />
        <Button type="submit" className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>Submit</Button>
      </div>
    </Form>
  );
};

export default ReviewCreateForm;
