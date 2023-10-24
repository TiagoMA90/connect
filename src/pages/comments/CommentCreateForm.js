import React, { useState } from "react";
// import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
// import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";


import appStyles from "../../App.module.css";

// CommentCreateForm Component
function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props; //Ignore the profileImage & profile_id, (commented)
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  };

  // CommentCreateForm Structure
  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
        
          {/*Commented (ignore this, left here for my own documentation):
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>*/}

        <label htmlFor="commentTextarea" className={appStyles['visually-hidden']}>{/* CSS - Hides Label for Screen readers, to prevent Empty Label */}
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
      <div className="d-flex justify-content-center">
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          disabled={!content.trim()}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Form>
  );
}

export default CommentCreateForm;