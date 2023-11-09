import React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";

// CommentEditForm Component
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  // CommentEditForm Structure
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          disabled={!content.trim()}
          type="submit"
        >
          Update
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
