import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styles from '../styles/CommunityComments.module.css';
import ChatComment from './SnipetComments';

// Community Comments Component
const CommunityComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetches all comments from endpoint /comments/
  const fetchComments = async () => {
    try {
      const response = await axios.get('https://djangorestframework-api-38c4a098777a.herokuapp.com/comments/');
      setComments(response.data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Community Comments Strcuture
  return (
    <Container className={`${styles.container} ${styles.Content}`}>
      <div className="text-center">
        <p>Latest Comments</p>
        <hr />
      </div>
      <div className={styles.chatBox}>
        {loading ? (
          <p className="text-center">Loading comments...</p>
        ) : error ? (
          <p className="text-center">Error fetching comments.</p>
        ) : comments.length > 0 ? (
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

export default CommunityComments;
