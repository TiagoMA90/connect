import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WallPost from "../../pages/walls/WallPost";
import appStyles from "../../App.module.css";

const WallPostsList = ({ profileId, currentUser, mobile }) => {
  const [wallPosts, setWallPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallPosts = async () => {
      try {
        const response = await axios.get(
          `https://djangorestframework-api-38c4a098777a.herokuapp.com/walls/?profile_id=${profileId}`
        );
        setWallPosts(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (profileId) {
      fetchWallPosts();
    }
  }, [profileId]);

  // Inline styling - Scroll Bar (no module.css)
  const scrollableContainerStyle = {
    maxHeight: "300px",
    overflowY: "auto",
  };

  return (
    <Container className={`${appStyles.Content} ${mobile ? "d-lg-none text-center mb-3" : ""}`}>
      <p className="text-center"><i class="fa-regular fa-comment-dots fa-lg"></i>Community Wall</p>
      <hr />
      <div style={scrollableContainerStyle}>
        {wallPosts.length > 0 ? (
          <div className={mobile ? "d-flex justify-content-around" : ""}>
            {wallPosts.map((wallPost) => (
              <WallPost
                key={wallPost.id}
                {...wallPost}
                currentUser={currentUser}
                isOwner={wallPost.is_owner}
                mobile={mobile}
              />
            ))}
          </div>
        ) : (
          <p>No wall posts available.</p>
        )}
      </div>
    </Container>
  );
};

export default WallPostsList;