import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styles from '../styles/ChatComponent.module.css';
import ChatComment from './ChatComment';

const FilteredComments = ({ profileId }) => {
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(null);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${profileId}/`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://djangorestframework-api-38c4a098777a.herokuapp.com/comments/');
      const filteredComments = response.data.results.filter(comment => comment.profile_id === profileId);
      setComments(filteredComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
    fetchComments();
  }, [profileId]);

  return (
    <Container className={`${styles.container} ${styles.Content}`}>
      <div className="text-center">
        <p>{profile?.owner}'s Comments</p>
        <hr />
      </div>
      <div className={styles.chatBox}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ChatComment
              key={comment.id}
              profile_id={comment.profile_id}
              profile_image={comment.profile_image}
              owner={comment.owner}
              updated_at={comment.updated_at}
              content={comment.content}
              post={comment.post}
            />
          ))
        ) : (
          <p className="text-center">No comments available.</p>
        )}
      </div>
    </Container>
  );
};

export default FilteredComments;
