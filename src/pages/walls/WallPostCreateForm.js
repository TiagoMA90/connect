import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfileReviews.module.css";
import wallPostStyles from "../../styles/WallPostCreateForm.module.css";

const WallPostCreateForm = ({ profileId, createWallPost, currentUser }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Authentication
    if (!currentUser) {
      setErrors([
        <div className={styles.errorMessage}>You must be logged in to post on the wall.</div>
      ]);
      return;
    }

    // Validation
    if (content.trim() === "") {
      setErrors([
        <div className={styles.errorMessage}>Please write a message if you wish to submit.</div>
      ]);
      return;
    }

    const wallPostData = {
      profile_id: profileId,
      content: content,
    };

    // Call the createWallPost function (passed from the parent component)
    createWallPost(wallPostData);

    // Reset the form and clears errors
    setContent("");
    setErrors([]);

    // Set the formSubmitted state to true
    setFormSubmitted(true);
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
      {formSubmitted ? ( // Success message for Wall submission
        <Alert variant="secondary">
          You have successfully posted on th Community Wall.
        </Alert>
      ) : (
        <>
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
            <Form
              onSubmit={handleSubmit}
              id="wall-post-form-collapse"
              className={wallPostStyles["wall-post-form"]}
            >
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a message on the wall..."
                />
              </Form.Group>
              {errors.length > 0 && (
                <Alert variant="warning">
                  {errors.map((error, index) => (
                    <div key={index} className={styles.errorMessage}>
                      {error}
                    </div>
                  ))}
                </Alert>
              )}
              <Button
                type="submit"
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
              >
                Post Message
              </Button>
            </Form>
          </Collapse>
        </>
      )}
    </div>
  );
};

export default WallPostCreateForm;
