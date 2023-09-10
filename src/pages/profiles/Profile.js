import React from 'react';
import styles from '../../styles/Profile.module.css';
import { Button } from 'react-bootstrap';
import btnStyles from '../../styles/Button.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetProfileData } from '../../contexts/ProfileDataContext';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;

  const currentUser = useCurrentUser();
  const { handleFollow, handleUnfollow } = useSetProfileData();

  // Check if profile is not null or undefined
  if (!profile) {
    return <div>Loading...</div>; // or: return null;
  }

  const is_owner = currentUser?.username === profile.owner;
  const { id, following_id, image, owner } = profile;

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && 'ml-auto'}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
