import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import appStyles from "../../App.module.css";
import Profile from "./Profile";

const FollowedProfiles = ({ mobile, followedId }) => {
  const [followedProfiles, setFollowedProfiles] = useState([]);

  const fetchProfileDetails = async (profileId) => {
    try {
      const response = await axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${profileId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (followedId) {
      axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/followers/`)
        .then(async (response) => {
          const filteredProfiles = response.data.results.filter(profile => profile.followed_name === followedId);
          
          // Fetch profile details for each followed profile
          const profilesWithDetails = await Promise.all(filteredProfiles.map(async (profile) => {
            const profileDetails = await fetchProfileDetails(profile.owner_id);
            return {
              ...profile,
              profileDetails
            };
          }));
          setFollowedProfiles(profilesWithDetails);
        })
        .catch((error) => {
          console.error("Error fetching followed profiles:", error);
        });
    }
  }, [followedId]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
    >
      <div className="text-center">
        <p>Followed Profiles</p>
        <hr />
        <div className="text-center">
          {followedProfiles.length > 0 ? (
            followedProfiles.map((profile) => (
              <Profile key={profile.id} profile={profile.profileDetails} mobile={mobile} />
            ))
          ) : (
            <p>This section is Empty</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default FollowedProfiles;