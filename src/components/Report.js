import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';


function Report({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    setIsReporting(true);
    try {
      await axios.post(`https://djangorestframework-api-38c4a098777a.herokuapp.com/reports/${post.Id}/`, { reason });
      setShowModal(false);
      // FIXDisplay a success message /or eleborate New component
    } catch (error) {
      console.error("Error reporting post:", error);
      // FIXHandle error / display an error message
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
