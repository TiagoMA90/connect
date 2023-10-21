import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ReviewForm.module.css";

const WallPostCreateForm = ({ profileId, createWallPost, currentUser }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is authenticated
    if (!currentUser) {
      setErrors(["You must be logged in to post on the wall."]);
      return;
    }

    // Validation
    if (content.trim() === "") {
      setErrors(["Please provide wall post content."]);
      return;
    }

    const wallPostData = {
      profile_id: profileId,
      content: content,
    };

    createWallPost(wallPostData);
    setContent("");
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // Renders the form only if the user is logged in
  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={toggleForm}
        aria-controls="wall-post-form-collapse"
        aria-expanded={isFormOpen}
        style={{ width: "100%" }}
      >
        {isFormOpen ? "Close Wall Post Form" : "Write a Wall Post"}
      </Button>
      <Collapse in={isFormOpen}>
        <Form onSubmit={handleSubmit} id="wall-post-form-collapse" className={styles['review-create-form']}>
          <Form.Group>
            {/*<Form.Label className={styles['review-form-label']}>Wall post</Form.Label>*/}
            <Form.Control
              as="textarea"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a message on the wall..."
            />
          </Form.Group>
          {errors.map((error, index) => (
            <div key={index} className={styles['review-form-label']}>
              {error}
            </div>
          ))}
          <Button
            type="submit"
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
          >
            Post Message
          </Button>
        </Form>
      </Collapse>
    </div>
  );
};

export default WallPostCreateForm;
