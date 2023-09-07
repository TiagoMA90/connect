import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import appStyles from "../../App.module.css";
import Profile from "./Profile";

{/* FollowingProfiles Component */}
const FollowingProfiles = ({ mobile, ownerId }) => {
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [ownerUsername, setOwnerUsername] = useState("");
  {/* Fetches all profiles details from endpoint /prodiles/id */}
  const fetchProfileDetails = async (profileId) => {
    try {
      const response = await axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${profileId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile details:', error);
      return null;
    }
  };

  {/* Fetches usernames associated to a ownerId from the endpoint /profiles/ */}
  useEffect(() => {
    const fetchOwnerUsername = async () => {
      try {
        const response = await axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${ownerId}/`);
        setOwnerUsername(response.data.owner);
      } catch (error) {
        console.error('Error fetching owner username:', error);
        setOwnerUsername("");
      }
    };

    if (ownerId) {
      fetchOwnerUsername();
    }
  }, [ownerId]);

  {/* Fetch and display the following profiles */}
  useEffect(() => {
    if (ownerId) {
      axios.get(`https://djangorestframework-api-38c4a098777a.herokuapp.com/followers/`)
        .then(async (response) => {
          const filteredProfiles = response.data.results.filter(profile => profile.owner_id === ownerId);

          const profilesWithDetails = await Promise.all(filteredProfiles.map(async (profile) => {
            const profileDetails = await fetchProfileDetails(profile.followed);
            return {
              ...profile,
              profileDetails
            };
          }));
          setFollowingProfiles(profilesWithDetails);
        })
        .catch((error) => {
          console.error("Error fetching following profiles:", error);
        });
    }
  }, [ownerId]);

  {/* FollowingProfiles Structure */}
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
    >
      <div className="text-center">
        <p>{ownerUsername}'s Followings</p>
        <hr />
        <div className={`text-center ${mobile ? "d-flex flex-wrap justify-content-center" : ""}`}>
          {followingProfiles.length > 0 ? (
            followingProfiles.map((profile) => (
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

export default FollowingProfiles;
