import React, { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { Button, Modal, Form } from "react-bootstrap";

const Report = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setReason(""); // Reset the reason field when closing the modal
    setShowModal(false);
    setErrorMsg("");
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        post_id: post.id, // Ensure that "post_id" is correctly set
        reason
      };

      await axiosRes.post(`/reports/`, data);
      handleClose();
      // Create a Component - success message or update the UI after reporting.
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setErrorMsg("An error occurred while reporting this post. Please try again.");
    }
  };

  return (
    <>
      <span onClick={handleShow}>
        <i className="fas fa-flag" />
      </span>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reportReason">
              <Form.Label>Reason for Reporting</Form.Label>
              <Form.Control
                as="select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Select a reason...</option>
                <option value="spam_flame">Spamming and Flaming</option>
                <option value="inappropriate">Inappropriate Content</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Report;
