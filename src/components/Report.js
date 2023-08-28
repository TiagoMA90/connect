import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

function Report({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState("");

  const handleReport = async () => {
    setIsReporting(true);
    setError("");
    try {
      await axios.post(`/reports/`, { post: post, reason: reason }); // Tutor!Help! - This Endpoint does not communicate with the API???!
      setShowModal(false);
      // Fixthis: Create a component here to redirect users to a a success page!
    } catch (error) {
      console.error("Error reporting post:", error);
      setError("An error occurred while reporting the post. Please try again later.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <Button variant="link" onClick={() => setShowModal(true)}>
        <i className="fa-regular fa-flag" />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="error-message">{error}</p>}
          <p>Choose a reason for reporting this post:</p>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isReporting}
          >
            <option value="">Select Reason</option>
            <option value="spam_flame">Spamming and Flaming</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="other">Other</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isReporting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleReport}
            disabled={!reason || isReporting}
          >
            {isReporting ? "Reporting..." : "Report"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Report;
