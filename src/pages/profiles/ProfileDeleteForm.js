import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";
import buttonStyles from "../../styles/Button.module.css";

import { removeTokenTimestamp } from "../../utils/utils";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const ProfileDeleteForm = ({ id }) => {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await axios.delete(`/profiles/${id}/delete/`);
      setCurrentUser(null);
      removeTokenTimestamp();
      localStorage.removeItem("accessToken");
      history.push("/");
    } catch (error) {
      console.error("Error deleting profile:", error.message);
    }
  };

  return (
    <Container className={`${appStyles.Content} p-4 mt-2`}>
      <Row className={buttonStyles.Row}>
        <Col className="my-auto p-0 p-md-2 d-flex align-items-center justify-content-center" md={12}>
          <div>
            <p>You are about to delete your account. Are you sure?</p>
            <button
              className={`${buttonStyles.Button} ${buttonStyles.Wide} ${buttonStyles.Bright}`}
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDeleteForm;
