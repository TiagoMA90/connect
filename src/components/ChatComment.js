import React from 'react';
import styles from '../styles/Comment.module.css';
import Avatar from './Avatar';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChatComment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    post,
  } = props;


  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
          <Link to={`/posts/${post}/`}>
            View Post
          </Link>
        </Media.Body>
      </Media>
    </>
  );
};

export default ChatComment;
