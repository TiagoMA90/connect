// FollowedProfiles.js
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios"; // Import axios
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
      url = response.data.next; // Get the data on the next page
    }
    return results;
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    return results; // Return whatever results were fetched before the error occurred
  }
}

// FollowedProfiles Component
const FollowedProfiles = ({ mobile, followedId }) => {
  const [followedProfiles, setFollowedProfiles] = useState([]);
  const [errorFetchingData, setErrorFetchingData] = useState(false);

  // Fetches all profiles' details from endpoint /profiles/id
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProfiles = await fetchAllPages(
          `https://djangorestframework-api-38c4a098777a.herokuapp.com/followers/`
        );

        const filteredProfiles = allProfiles.filter(
          (profile) => profile.followed_name === followedId
        );

        const profileDetailsPromises = filteredProfiles.map(async (profile) => {
          try {
            const profileDetails = await fetchProfileDetails(profile.owner_id);
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
        setFollowedProfiles(validProfiles);
        setErrorFetchingData(false); // Reset error flag

        // Console.log:
        console.log("API - response:", allProfiles);
        console.log("FE - response: Number of followers:", validProfiles.length);
      } catch (error) {
        console.error("Error fetching followed profiles:", error);
        setErrorFetchingData(true); // Set error flag
      }
    };

    // Fetch and display the following profiles by followedId
    if (followedId) {
      fetchData();
    }
  }, [followedId]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
      style={{ marginTop: "10px" }}
    >
      <div className="text-center">
        <p>{followedId}'s Followers</p>
        <hr />
        {errorFetchingData ? (
          <p>Failed to fetch data. Please try again later.</p>
        ) : (
          <div
            className={`text-center ${
              mobile ? "d-flex flex-wrap justify-content-center" : ""
            }`}
          >
            {followedProfiles.length > 0 ? (
              <div
                style={{ // Styling scrollbar (No .module.css)
                  overflowY: "auto", // Applies a scrollbar for vertical overflow
                  maxHeight: "300px", // Adjusts the max height as needed
                }}
              >
                {followedProfiles.map((profile) => (
                  <Profile
                    key={profile.id}
                    profile={profile.profileDetails}
                    mobile={mobile}
                    showButtons={false}
                  />
                ))}
              </div>
            ) : (
              <p>This section is Empty</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FollowedProfiles;
