import React, { useState } from "react";
import { Container, Collapse } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

// PopularProfiles Component
const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapse

  // Toggle Collapse for the Component
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // PopularProfiles Structure
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
      style={{ marginTop: "10px" }} // Keep the marginTop style
    >
      <div className="text-center" onClick={toggleCollapse} style={{ cursor: "pointer" }}>
        <p>
          <i className="fa-solid fa-users-viewfinder fa-lg"></i>Popular Profiles
        </p>
        <hr />
      </div>
      <Collapse in={!isCollapsed}>
        <div className="text-center">
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
      </Collapse>
    </Container>
  );
};

export default PopularProfiles;
