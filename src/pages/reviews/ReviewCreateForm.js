import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Rating } from "react-simple-star-rating";

const ReviewCreateForm = ({ profile_id, createReview, currentUser }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleRating = (rate) => {
    console.log("Rating??????", rate);
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
    setRating(0);
    setContent("");
  };

  // Renders the form only if the user is logged in
  if (!currentUser) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Rating onClick={handleRating} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Review - style later</Form.Label>
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
      <Button type="submit">Submit Review</Button>
    </Form>
  );
};

export default ReviewCreateForm;
