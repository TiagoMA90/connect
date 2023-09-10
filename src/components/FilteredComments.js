import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styles from '../styles/CommunityComments.module.css';
import SnipetComments from './SnipetComments';

// Filtered Comments Component
const FilteredComments = ({ profileId }) => {
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(null);

  // Fetches Profiles & Comments by Profile respectively, by each endpoint
  const fetchProfileDetails = useCallback(async () => {
    try {
      if (!profileId) {
        // Avoids making the request when profileId is undefined
        return;
      }
      const response = await axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${profileId}/`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  }, [profileId]);

  const fetchComments = useCallback(async () => {
    try {
      if (!profileId) {
        // Avoids making the request when profileId is undefined
        return;
      }
      const response = await axios.get('https://djangorestframework-api-38c4a098777a.herokuapp.com/comments/');
      const filteredComments = response.data.results.filter(comment => comment.profile_id === profileId);
      setComments(filteredComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [profileId]);

  useEffect(() => {
    fetchProfileDetails();
    fetchComments();
  }, [fetchProfileDetails, fetchComments]);

  // Filtered(User) Comments Structure
  return (
    <Container className={`${styles.container} ${styles.Content}`}>
      {profile ? (
        <div className="text-center">
          <p>{profile.owner}'s Comments</p>
          <hr />
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
      <div className={styles.chatBox}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <SnipetComments
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
