import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { error, loading, user } = useSelector((state) => state.user);

  const navigate = useNavigate()
  return (
    <>
      {
        loading ? (<Loader />) : (
          <>
            <div>
              <label>Name</label>
              <div>{user.name}</div>
              <label>Email</label>
              <div>{user.email}</div>
    
              <label>Avatar</label>
              <Avatar src={user.avatar.url}/>
            </div>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/updateprofile")}>Update Profile</button>
          </>
          )
      }
    </>
  );
};

export default Profile;
