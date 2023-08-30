import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../styles/Report.module.css';
import btnStyles from "../styles/Button.module.css";

const Report = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('spam');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://djangorestframework-api-38c4a098777a.herokuapp.com/reports/', {
        post: postId,
        reason,
        description,
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error reporting post:', error);
    }
  };

  return (
    <span>
      <span className={btnStyles.Icon} onClick={openModal}>
        <i className="fa-regular fa-flag"></i>
      </span>
      {success ? (
        <p>Post reported successfully!</p>
      ) : (
        <ReportModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          onSubmit={handleSubmit}
          reason={reason}
          handleReasonChange={handleReasonChange}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
        />
      )}
    </span>
  );
};

{/* Pop Up Modal for the Report! - Come back here (Make it a separate component /as page???) */}
const ReportModal = ({ isOpen, onRequestClose, onSubmit, reason, handleReasonChange, description, handleDescriptionChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Post"
      className={styles['report-modal']}
      overlayClassName={styles['report-overlay']}
    >
      <h5><i class="fa-solid fa-triangle-exclamation"></i> You are about to make a report!</h5>
      <p>Before you file a report make sure this Post goes against our rules & guidelines.</p>
      <p>We highly encourage our community to participate and share posts. However, if the post falls under Spam, Innapropriate content or any other sort of inadequate submition, we will tak action.</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="reason">Reason:</label>
          <br/>
          <select id="reason" value={reason} onChange={handleReasonChange}>
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="other">Other...</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className={styles['description-input']}
          />
        </div>
        <div className={styles['button-container']}>
          <div style={{ textAlign: 'center' }}>
            <button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">Report</button>
            <button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="button" onClick={onRequestClose}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Report;
