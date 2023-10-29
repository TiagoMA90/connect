import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Alert from "react-bootstrap/Alert";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (event) => {
    setContent(event.target.value);
    setShowWarning(false); // Reset the warning when the user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (content.trim() === "") {
      setShowWarning(true); // Display the warning if the form is empty
      return;
    }

    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  }

  // CommentCreateForm Structure
  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <label htmlFor="commentTextarea" className={appStyles['visually-hidden']}>
            Comment section
          </label>
          <Form.Control
            id="commentTextarea"
            className={styles.Form}
            placeholder="Write a comment to this post..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {showWarning && (
        <Alert variant="warning" className="text-center">
          Please write a comment before submitting.
        </Alert>
      )}
      <div className="d-flex justify-content-center">
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Form>
  );
}

export default CommentCreateForm;
