import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import appStyles from "../../App.module.css";
import Profile from "./Profile";

// Fetch the results for all pages
async function fetchAllPages(initialUrl) {
  let results = [];
  let url = initialUrl;

  try {
    while (url) {
      const response = await axios.get(url);
      results = results.concat(response.data.results);
      url = response.data.next; // Get the data in the next page
    }
    return results;
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    return results; // Return whatever results were fetched before the error occurred
  }
}

// FollowingProfiles Component
const FollowingProfiles = ({ mobile, ownerId }) => {
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [ownerUsername, setOwnerUsername] = useState("");
  const [errorFetchingData, setErrorFetchingData] = useState(false);

  // Fetches all profiles details from endpoint /profiles/id
  const fetchProfileDetails = async (profileId) => {
    try {
      const response = await axios.get(
        `https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${profileId}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching profile details:", error);
      return null;
    }
  };

  // Fetches usernames associated to a ownerId from the endpoint /profiles/
  useEffect(() => {
    const fetchOwnerUsername = async () => {
      try {
        const response = await axios.get(
          `https://djangorestframework-api-38c4a098777a.herokuapp.com/profiles/${ownerId}/`
        );
        setOwnerUsername(response.data.owner);
      } catch (error) {
        console.error("Error fetching owner username:", error);
        setOwnerUsername("");
      }
    };

    // Fetch and display the following profiles by ownerId
    if (ownerId) {
      fetchOwnerUsername();
    }
  }, [ownerId]);

  useEffect(() => {
    if (ownerId) {
      fetchAllPages(
        `https://djangorestframework-api-38c4a098777a.herokuapp.com/followers/`
      )
        .then(async (allProfiles) => {
          const filteredProfiles = allProfiles.filter(
            (profile) => profile.owner_id === ownerId
          );

          const profileDetailsPromises = filteredProfiles.map(async (profile) => {
            try {
              const profileDetails = await fetchProfileDetails(profile.followed);
              return {
                ...profile,
                profileDetails,
              };
            } catch (error) {
              console.error("Error fetching profile details for profile:", profile, error);
              return null;
            }
          });

          const profilesWithDetails = await Promise.all(profileDetailsPromises);
          const validProfiles = profilesWithDetails.filter((profile) => profile !== null);
          setFollowingProfiles(validProfiles);
          setErrorFetchingData(false); // Reset error flag

          // Console.log:
          console.log("API - response:", allProfiles);
          console.log("FE - response: Number of followings:", validProfiles.length);
        })
        .catch((error) => {
          console.error("Error fetching following profiles:", error);
          setErrorFetchingData(true); // Set error flag
        });
    }
  }, [ownerId]);

  // FollowingProfiles Structure
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
    >
      <div className="text-center">
        <p>{ownerUsername}'s Followings</p>
        <hr />
        {errorFetchingData ? (
          <p>Failed to fetch data. Please try again later.</p>
        ) : (
          <div
            className={`text-center ${
              mobile ? "d-flex flex-wrap justify-content-center" : ""
            }`}
          >
            {followingProfiles.length > 0 ? (
              followingProfiles.map((profile) => (
                <Profile key={profile.id} profile={profile.profileDetails} mobile={mobile} />
              ))
            ) : (
              <p>This section is Empty</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FollowingProfiles;
