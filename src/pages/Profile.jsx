import React, { useEffect, useState } from "react";
import { _get } from "../services/api";
import { Loading, Button } from "../components";
import { useToast } from "../services/hook";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [loadingProfileData, setLoadingProfileData] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const getProfileData = async () => {
    setLoadingProfileData(true);
    try {
      const response = await _get("social-media/profile");
      if (response?.status === 200) {
        setProfileData(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
      setLoadingProfileData(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (loadingProfileData) {
    return <Loading />;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <img
            src={profileData.account.avatar.url}
            alt={profileData.account.profileDataname}
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px" }}
          />
          <h4 className="card-title">
            {profileData.firstName} {profileData.lastName}
          </h4>
          <p>username: {profileData.account.username}</p>
          <p className="card-text">{profileData.bio}</p>
          <p className="card-text">
            <strong>Location:</strong> {profileData.location}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {profileData.account.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {profileData.countryCode} {profileData.phoneNumber}
          </p>
          <div className="row mt-3">
            <div className="col-6">
              <p className="card-text">
                <strong>Followers:</strong> {profileData.followersCount}
              </p>
            </div>
            <div className="col-6">
              <p className="card-text">
                <strong>Following:</strong> {profileData.followingCount}
              </p>
            </div>
          </div>
          <img
            src={profileData.coverImage.url}
            alt="Cover"
            className="img-fluid mt-3"
            style={{ maxHeight: "200px", width: "100%" }}
          />
        </div>
      </div>
      <div className="mt-3 d-flex gap-2 justify-content-center">
        <Button className="btn-primary" onClick={() => navigate("/update-profile")}>
          Update Complete Profile
        </Button>
      </div>
    </div>
  );
}
