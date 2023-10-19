import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

// PopularProfiles Component
const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  // Inline styling - Margin-Top for this component (no module.css)
  const marginTopStyle = {
    marginTop: "10px",
  };

  // PopularProfiles Structure
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
      style={marginTopStyle}
    >
      <div className="text-center">
        <p>Popular Profiles</p>
        <hr />
        {popularProfiles.results.length ? (
          mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )
        ) : (
          <p>No users available</p>
        )}
      </div>
    </Container>
  );
};

export default PopularProfiles;
