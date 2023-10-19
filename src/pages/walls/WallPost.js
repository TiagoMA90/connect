import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import axios from "axios";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Review.module.css"; // NOte to self: adopts the styling for the button from review (create an individual .css?)

const WallPost = (props) => {
  const { id, owner, updated_at, content, currentUser, isOwner } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `https://djangorestframework-api-38c4a098777a.herokuapp.com/walls/${id}/`,
        {
          content: editedContent,
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
      } else {
        console.error("Error updating wall post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating wall post:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>{owner}</span>
              <span style={{ color: "gray", fontSize: "12px", marginLeft: "10px" }}>
                • {updated_at}
              </span>
            </div>
            {currentUser && isOwner && (
              <button
                className={`${styles.editButton} ${styles.editButtonDate}`}
                onClick={handleEditClick}
              >
                <i className="fa-solid fa-pen-to-square fa-sm"></i>
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                style={{ width: "100%" }}
              />
              <div className="button-container">
                <Button
                  type="submit"
                  className={`${btnStyles.Button} ${btnStyles.Bright}`}
                  onClick={handleSaveClick}
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  className={`${btnStyles.Button} ${btnStyles.Bright}`}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <p>{editedContent}</p>
          )}
        </Media.Body>
      </Media>
    </>
  );
};

export default WallPost;
